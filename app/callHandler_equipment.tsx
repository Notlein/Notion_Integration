import { ReactNode } from "react";

async function getDB(database : string) {
  //HTTP call with fetch API, POST -> /query database
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer secret_Vbr51OzQPAue1DadDWYWVTQMlk5myAFkVWsk4r204tL`,
      accept: 'application/json',
      'Notion-Version': '2022-06-28',
      'content-type': 'application/json'
    },
    body: JSON.stringify({page_size: 100})
  };

  let x : JSON = await fetch(`https://api.notion.com/v1/databases/${database}/query`, options)
  .then(response => response.json())
  .then(response => {return response})
  .catch(err => console.error(err));
  return x;
}

export default async function AppelInventaire() {
  const res : any = await getDB("930b36a1652e4765be1f7ebae77b2fdd"); // Inventaire ID
  
    let jsonArray : Array<Object> = res?.results;
    const equipment: string[] = jsonArray.map((obj : any) => obj?.properties?.Nom?.title[0]?.text?.content);
    let equip_length : number = equipment.length;
    let content_equip : Array<ReactNode> = [];
    for(let i : number = 0;i < equip_length; i++ ){
      console.log(equipment[i]);
      content_equip.push(<p key={i}>{equipment[i]}</p>);
    }
    
 
  // .forEach(element => {
    
  // });
  // content += res[]
  return (<div>{content_equip}</div>)
}
