# mongoDBLPview


## Usage 


La base de données peut être téléchargée à partir de ce lien [DBLP.json.zip](http://b3d.bdpedia.fr/files/dblp.json.zip) que vous décompresserez


Importez les données de la base dans MongoDB via la commande suivante :
``` bash 
mongoimport --uri "mongodb://localhost:27017/dblp" --collection dblp --type json --file path/to/dblp.json --jsonArray
```


```  bash
    
    git clone https://github.com/Limssly/mongoDBLPview.git

    cd mongoDBLPview

    npm install

    node server.js

    cd frontendview

    npm install

    npm run dev 
```



