from flask import Flask, request, jsonify
import pandas as pd
from surprise import SVD, Dataset, Reader
import mysql.connector
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re
import decimal
app = Flask(__name__)

# Fonction pour charger les données depuis la base de données
def get_data(conn, dtype):
    cursor = conn.cursor()
    query = """
        SELECT e.email, e.id, e.nbrstar, p.nom, p.description, g.libelle
        FROM evaluation e
        INNER JOIN produit p ON e.id = p.id
        INNER JOIN genre g ON p.genre_id_g = g.id_g
        WHERE p.dtype = %s
    """
    
    cursor.execute(query, (dtype,))
    data = cursor.fetchall()
    cursor.close()
    return pd.DataFrame(data, columns=['user_id', 'product_id', 'rating', 'nom_produit', 'description', 'genre'])
def get_data2(conn2, dtype):
    cursor = conn2.cursor()
    # query = "SELECT id, author, description FROM produit WHERE dtype = %s"
    query= """
        SELECT  p.id,p.description, p.author,g.libelle,prix
        FROM produit p
        INNER JOIN genre g ON p.genre_id_g = g.id_g
        WHERE dtype = %s
    """
    cursor.execute(query, (dtype,))
    data = cursor.fetchall()
    cursor.close()
    new=[]
    for i in data:
        s=''
        n=0
        for j in i:
            if(isinstance(j, str)) or (isinstance(j,decimal.Decimal)):
                s=s+" "+str(j)
            else:
                n=j
        new.append((n,s))
    return pd.DataFrame(new, columns=['product_id', 'description'])

# Fonction pour entraîner le modèle
def train_model(df):
    reader = Reader(rating_scale=(1, 5))
    dataset = Dataset.load_from_df(df[['user_id', 'product_id', 'rating']], reader)
    trainset = dataset.build_full_trainset()
    model = SVD()
    model.fit(trainset)
    return model

def nettoyer_texte(texte):
    # Convertir en minuscules
    texte = texte.lower()

    # Supprimer les espaces supplémentaires
    texte = re.sub(r'\s+', ' ', texte)

    # Retourner le texte nettoyé
    return texte.strip()
def train_model2(df):
    df['description']=df['description'].apply(nettoyer_texte)
    vectoriseur = TfidfVectorizer()
    # Calcul de la matrice TF-IDF
    matrice_tfidf = vectoriseur.fit_transform(df['description'])
    return matrice_tfidf
# Fonction pour recommander des produits

def recommend(user_id, model, df):
    rated_items = df[df['user_id'] == user_id]['product_id'].tolist()
    unrated_items = [item_id for item_id in df['product_id'].unique() if item_id not in rated_items]
    predictions = []
    for item_id in unrated_items:
        pred = model.predict(user_id, item_id)
        predictions.append((pred.iid, pred.est))
    sorted_predictions = sorted(predictions, key=lambda x: x[1], reverse=True)
    return sorted_predictions

def recommend2(product_id, matrice_tfidf, df):

    similarite_cosinus = cosine_similarity(matrice_tfidf)

    # Index du produit de référence
    produit_reference = df[df['product_id'] == product_id].index[0]

    # Récupération des indices des produits similaires
    indices_similaires = similarite_cosinus[produit_reference].argsort()[::-1]

    # Produits recommandés
    produits_recommandes = df.loc[indices_similaires[1:], 'product_id']

    # Affichage des produits recommandés
    liste=produits_recommandes.tolist()
    recom = [(df.loc[iid, 'product_id'],int(iid)) for iid in indices_similaires[1:]]
    return recom

# Connexion à la base de données
try:
    # Connexion à la base de données MySQL
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="ines24/1999",
        database="shop3"
    )
    
    
except mysql.connector.Error as error:
    print("Erreur lors de la connexion à la base de données:", error)
# conn2 = mysql.connector.connect(
#         host="localhost",
#         user="root",
#         password="ines24/1999",
#         database="shop3"
#     )

# Route pour obtenir les recommandations
@app.route('/recommendations', methods=['GET'])
def get_recommendations():
    user_id = int(request.args.get('user_id'))
    dtype = request.args.get('dtype')
    
    # Charge les données et entraîne le modèle
    df = get_data(conn, dtype)
    model = train_model(df)
   
    recommendations = recommend(user_id, model, df)
    recommendations = [(int(iid), float(est)) for iid, est in recommendations]
    return jsonify(recommendations)
    


# # Route pour obtenir les recommandations
@app.route('/recommendations2', methods=['GET'])
def get_recommendations2():
    dtype = request.args.get('dtype')
    produit_id = int(request.args.get('produit_id'))
    # Charge les données et entraîne le modèle
    df = get_data2(conn, dtype)
    matrice_tfidf = train_model2(df)
    recommendations = recommend2(produit_id, matrice_tfidf, df)
    recommendations = [(int(iid), float(est)) for iid, est in recommendations]
    return jsonify(recommendations)
if __name__ == '__main__':
    app.run(debug=True)
#https://medium.com/ai-in-plain-english/using-langchain-chains-and-agents-for-llm-application-development-d538f6c70bc6
#https://medium.com/@onkarmishra/using-langchain-for-large-language-model-application-development-74260b794af9