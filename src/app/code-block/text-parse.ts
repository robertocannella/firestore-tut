export class TypeScriptHighlight{
  constructor() { }
  executable = ['import','return', 'export', 'if', 'for'];
  keyword = ['var','extends','interface','as','const','=>','class', 'constructor', 'let', 'this', 'new', 'implements', 'get', 'set', 'private', 'readonly'];
  object = [];
  method = ['pipe', 'map','replace']
  type = ['string','number','enum','Array']
  file = `
export interface Shirt {
  name: string;
  price: number;
}

export interface ShirtId extends Shirt{
  id: string;
}

  export class ShirtService {

    private shirtCollection: AngularFirestoreCollection<ShirtId>;
    
    constructor(private readonly afs: AngularFirestore) {
    this.shirtCollection = afs.collection<ShirtId>('shirts');

    this.addItem({
      id: '',
      name: 'collared Shirt',
      price: 8.99
    })
  }
    getAll(): Observable<ShirtId[]>{
    return this.shirtCollection.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as ShirtId;
            data.id = a.payload.doc.id;
            return { ...data }
      })))
  }
    private itemDoc: AngularFirestoreDocument<Item>
  private userDoc: AngularFirestoreDocument<Item>
  private itemsCollection: AngularFirestoreCollection<Item>;

  constructor(private afs: AngularFirestore) {
// gets the value of the document (no meta data)
// to get Id field pass the idField Obect inside that valueChanges Method.
    this.items$ = afs.collection<Item>('items').valueChanges({ idField: 'id'} );
    this.itemDoc = afs.doc<Item>('items/1');
    import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent  {
  items$: Observable<Item[]>;
  itemsCollectionObs$: Observable<Item[]>;
  item$: Observable<Item>;
  tasks$: Observable<Task[]>;
 

  private itemDoc: AngularFirestoreDocument<Item>
  private userDoc: AngularFirestoreDocument<Item>
  private itemsCollection: AngularFirestoreCollection<Item>;

  constructor(private afs: AngularFirestore) {
  // gets the value of the document (no meta data)
    // to get Id field pass the idField Obect inside that valueChanges Method.
    this.items$ = afs.collection<Item>('items').valueChanges({ idField: 'id'} );
    this.itemDoc = afs.doc<Item>('items/1');

    // need to explicitly define return type since we are adding the idField parameter; effectively
    //      altering the return type.  
    this.item$ = <Observable<Item>>this.itemDoc.valueChanges({ idField: 'id' });

    this.itemsCollection = afs.collection<Item>('items');
    this.itemsCollectionObs$ = this.itemsCollection.valueChanges({ idField: 'id' });
    
    
    let newItem = { name: 'updatedName' };
    this.update(newItem);

    // to retreive a nested collection se the collection(path: string) medthod
    this.userDoc = afs.doc<Item>('user/david');
    this.tasks$ = this.userDoc.collection<Task>('tasks').valueChanges();
  }
    
    var clearWhiteSpaces = comment
      .replace(/ \. /g, '.')
      .replace(/ \( /g, '(')
      .replace(/ \) /g, ')')
      .replace(/ &gt; /g, '&gt;')
      .replace(/ &lt; /g, '&lt;')
      .replace(/ , /g, ',')
      .replace(/ ; /g, ';')
      .replace(/ { /g, '{')
      .replace(/ } /g, '}')
      .replace(/ \[ /g, '[')
      .replace(/ \] /g, ']');   
    return clearWhiteSpaces;
  
  addItem(name: string) {
    // perisit a document id
    const id = this.afs.createId();
    const item: Item = { id, name };
    this.itemsCollection.doc(id).set(item)
  }

  update(item: Item) {
    this.itemDoc.update(item);
  }
}
export interface Item {
  id?: string;
  name: string;
}
export interface Task {
  id?: string;
  name: string;
}

  `;


  get html() {
 
    var addWhtSpcChars = this.file
      .replace(/;/g, ' ; ')
      .replace(/(?<! =)>/g, ' &gt; ')  // filter out arrow functions (look behind not supported prior 2018)
      .replace(/</g, ' &lt; ')
      .replace(/\{/g, ' { ')
      .replace(/\}/g, ' } ')
      .replace(/\./g, ' . ')
      .replace(/\)/g, ' ) ')
      .replace(/\(/g, ' ( ')
      .replace(/\,/g, ' , ')
      .replace(/\[/g, ' [ ')
      .replace(/\]/g, ' ] ')
      .replace(/\n/g, ' \n ')
    
    var splitted = addWhtSpcChars.split(" ");
      
    splitted.forEach((element, i) => {
        // parse for type
              if (element === '&lt;') {
                      splitted[i+ 1] = "<span class=\"type\">" + splitted[i + 1] + "</span>" 
                    }
              this.type.forEach(item => {
                if (item === element) {
                  splitted[i] = "<span class=\"type\">" + element + "</span>"
                }
               })
        // parse for executables
              this.executable.forEach(item => {
                if (item === element && item === 'export'){
                  splitted[i +2] = "<span class=\"type\">" + splitted[i+2] + "</span>";
                }
                if (item === element) {
                  splitted[i] = "<span class=\"executable\">" + element + "</span>";
                }
              })
        // parse for keywords and data types
              this.keyword.forEach(item => {
                if (item === element) {
                  if (item === ('this') && splitted[i + 3] === "=") 
                    splitted[i + 2] = "<span class=\"property\">" + splitted[i + 2] + "</span>";
                  
                  if (item === 'this' && splitted[i + 3] === "(") 
                    splitted[i + 2] = "<span class=\"method\">" + splitted[i + 2] + "</span>";
                  
                  if ((item === 'var' || item === 'let') && splitted[i + 2] === "=")
                    splitted[i + 1] = "<span class=\"property\">" + splitted[i + 1] + "</span>";
                  
                  if (item === 'private') 
                    splitted[i + 2] = "<span class=\"type\">" + splitted[i + 2] + "</span>";
                  
                  if (item === 'extends') 
                    splitted[i + 1] = "<span class=\"type\">" + splitted[i + 1] + "</span>";
                  
                  if (item === 'readonly') 
                    splitted[i + 2] = "<span class=\"type\">" + splitted[i + 2] + "</span>";
                  
                  if (item === 'as') 
                    splitted[i + 1] = "<span class=\"type\">" + splitted[i + 1] + "</span>";
                  
                  if (item === '=>') 
                    splitted[i - 1] = "<span class=\"property\">" + splitted[i - 1] + "</span>";
                  
                    splitted[i] = "<span class=\"keyword\">" + element + "</span>";
                }
                })
              
        // parse for method
              this.method.forEach(item => {
                if (item === element) {
                  splitted[i] = "<span class=\"method\">" + splitted[i] + "</span>";
                  }
              })
        // parse for property
              if (element[element.length - 1] === ':') {
                var str = element.slice(0, -1);
                  splitted[i] = "<span class=\"property\">" + str + "</span>:";
                }
            // parse for methods
            // parse for number
            
    });
    // parse for strings
    var stringLiterals = this.parseForStringLiterals(splitted);
    // parse for comments
    var comment = this.parseForComment(stringLiterals.split(' '));
    

    
    var clearWhiteSpaces = comment
      .replace(/ \. /g, '.')
      .replace(/ \( /g, '(')
      .replace(/ \) /g, ')')
      .replace(/ &gt; /g, '&gt;')
      .replace(/ &lt; /g, '&lt;')
      .replace(/ , /g, ',')
      .replace(/ ; /g, ';')
      .replace(/ { /g, '{')
      .replace(/ } /g, '}')
      .replace(/ \[ /g, '[')
      .replace(/ \] /g, ']');   
    return clearWhiteSpaces;
    
  }

  private parseForStringLiterals(splitString: string[]): string {
    // expects string array split with ' '
    var quoted = new RegExp(/'([^']*)'/g);
    var joined = splitString.join(' ');
    var splitString = joined.split(/\n/);
    splitString.forEach((element, i) => {
      if (element.match(quoted)) {
        var quote = element.match(quoted)
        if (quote) {
          quote.forEach(match => {
            if (splitString[i].match(match[i])) {
              splitString[i] = splitString[i].replace(match, "<span class=\"string\">" + match + "</span>")
            }
          })
        }
        }
    })
    return splitString.join('\n');
    
  }
  private parseForComment(splitString: string[]): string  {
    // expects string array split with ' '
    var startsWithSlash = new RegExp(/^\s*\/\//);    
    var joined = splitString.join(' ');
    splitString = joined.split(/\n/);
            splitString.forEach((element, i) => {
              if (element.match(startsWithSlash)) {
                var str = this.removeHtmlTags(element);
                splitString[i]= "<span class=\"comment\">" + str + "</span>"
              }
            });
    return splitString.join('\n')
  }
  private removeHtmlTags(str: string): string {
    var htmlTag = new RegExp(/<[^>]*>/gi);
    return str.match(htmlTag) ? str.replace(htmlTag, '') : str;
  }
}