# mongoDBLPview


## Usage 


the database  could be downloaded from this link [DBLP.json.zip](http://b3d.bdpedia.fr/files/dblp.json.zip)

Unzip the dblp.json.zip file

Import data into MongoDB with the next command 
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



