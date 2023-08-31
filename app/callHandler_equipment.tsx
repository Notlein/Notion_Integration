import { ScriptProps } from "next/script";
import { ReactNode } from "react";

async function getDB(database : string) {
  //HTTP call with fetch API, POST -> /query database
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
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

/**
 * Appel d'inventaire, retourne chaque objet dans un paragraphe accompagné de sa disponibilité, du type, du tarif (par jour pour le moment).
 * @returns 
 */
export default async function AppelInventaire() {
  const res : any = await getDB("930b36a1652e4765be1f7ebae77b2fdd"); // Inventaire ID
  
    let jsonArray : Array<Object> = res?.results;
    //const equipment_list: ScriptProps[] = jsonArray.map((obj : any) => obj?.properties);
    
    const equipment_list: Object[] = jsonArray.map((obj : any) => obj?.properties);
    const equip_int : Object[] = equipment_list.map((obj : any) => obj["Utilisation interne"]);
    const equip_int_rel : Array<Object> = equip_int.map((obj : any) => obj["relation"][0]); // first relation to check if there's a link
    
    const equipment: string[] = jsonArray.map((obj : any) => obj?.properties?.Nom?.title[0]?.text?.content);
    let equip_length : number = equipment.length;
    let content_equip : Array<ReactNode> = [];
    for(let i : number = 0;i < equip_length; i++ ){
      //console.log(equipment[i]);
      let obj : ScriptProps = equip_int_rel[i];
      let obj_txt : string = obj?.id !== undefined ? "Utilisé par "+obj.id : "Libre";
      let spacer_txt : string = " ==> ";
      content_equip.push(
      <p>
      <span key={i}>{equipment[i]}</span><span key={i}>{spacer_txt}{obj_txt}</span>
      </p>
      );
    }
    
 
  // .forEach(element => {
    
  // });
  // content += res[]
  return (<div>{content_equip}</div>)
}
