// steps

// 1. Open a database
//2. Create an object store in the database
// 3. on the success events, conduct your transactions
// 4. Close the transaction

// app about questions in a quiz
// qID, questionText, corretAnswer, studentAnswer, result

window.indexedDB = window.indexedDB || window.mozIndexedDB || 
window.webkitIndexedDB || window.msIndexedDB

// above making sure supported in broswer ...not neccessary but good idea

if (!window.indexedDB){
    alert('indexedDB not supported')
}

let request = window.indexedDB.open('QuestDataBase', 1),
db, 
tx,
store,
index;
// declaring variables 

// request returns with response

// brand new db or new version...onupgradeneeded events

request.onupgradeneeded = function(e){
    let db = request.result,
    store = db.createObjectStore('QuestionsStore', /*the key here ..object*/{ keyPath: 'qID' } ),
    // alt store = db.createObjectStore('QuestionStore, {autoIncrement : true})
    index = store.createIndex(/* call it */ 'questionText', /*based on */ 'questionText', {unique: false});
}
request.onerror = function(e){
    console.log('there is an error : ' + e.target.errorCode);

};

// used to get data and add data
request.onsuccess = function(e){
    db = request.result;
    tx = db.transaction("QuestionsStore", "readwrite");
    store = tx.objectStore("QuestionsStore");
    index = store.index("questionText");

    db.onerror = function(e){
        console.log('Error ' + e.target.errorCode)
    }
   // store.put({qID: 1, questionText: "The sky is blue", correctAnswer: true, studentAnswer: true, result: true});
  //  store.put({qID: 2, questionText: "The grass is green", correctAnswer: true, studentAnswer: true, result: true});

    let q1 = store.get(1);
    let qs = index.get('The grass is green');

    q1.onsuccess = function(){
        console.log(q1.result);
        console.log(q1.result.questionText)
    }

    qs.onsuccess = function(){
        console.log(qs.result.questionText);
    }

    tx.oncomplete = function(){
        db.close();
    }

};
// an index allows us to retrieve data using something other than the key...eg questionText
// for searching...eg names or birthdate search