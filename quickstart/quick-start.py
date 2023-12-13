import os
import subprocess

print("Bienvenu dans l'assistant de configuration du projet SNEAKERS. Nous allons vérifier que toutes les ressources sont accessibles")
path=input("Entrez le chemin vers le dossier source: ")
if not path:
    print("Il faut entrer quelque chose")
    exit()
os.chdir(path)
file_list=os.listdir()
if file_list!=['sneakers-backend', '.DS_Store', 'LICENSE', 'quickstart', 'readme.md', '.gitignore', 'sneakers-frontend', '.git', 'documentation_screen', '.idea']:
    print("Vous n'avez pas téléchargé tous les fichiers. Veuillez vérifier les ressources du projet et réessayez")
    exit()

print("=== Téléchargement des paquet")
os.chdir("sneakers-backend")
backend_download = subprocess.run("npm install", shell=True)
if backend_download:="18 packages are looking for funding":
    print("=== Pacquet du backend téléchargés ===")
else:
    print("Echec du téléchargement, vérifiez votre connexion.")
    exit()

print("Nous allons configurer la base de donnée.")
host=input("Host du serveur SQL: ")
user_name=input("Nom d'utilisateur pour le serveur SQL: ")
database=input("Nom de la base de donnée SQL: ")
mdp=input("Mot de passe du serveur SQL: ")
port=int(input("Port du serveur SQL: "))
characters=input("Chaîne de caractère pour encoder les token: ")

if host and user_name and database and mdp and port and characters:
    f=open(".env", "w", encoding="utf-8")
    f.write('SQL_HOST="{}"\nSQL_DATABASE="{}"\nSQL_USER="{}"\nSQL_PASSWORD="{}"\nSQL_PORT={}\nTOKEN_CHARACTERS="{}"'.format(host,database,user_name,mdp,port,characters))
    f.close()
else:
    print("Vous devez remplir tous les champs!")
    exit()

os.chdir("../sneakers-frontend")
print("=== Téléchargement des paquets du front ===")
front_download=subprocess.run("npm install", shell=True)
if front_download:="24 packages are looking for funding":
    print("=== Les paquets ont été correctement installé")
else:
    print("Erreur de téléchargement")
    exit()

print("=== Fin de l'installation. Vous pouvez lancer les 2 serveur en suivants les instructions de la documentation. ===")
github=input("Souhaitez-vous afficher le dépôt GitHub? y/n")
if github:="y":
    os.system("open https://github.com/theotime2005/sneakers")
elif github:="Y":
    os.system("open https://github.com/theotime2005/sneakers")

print("Fin de l'assistant")
exit()