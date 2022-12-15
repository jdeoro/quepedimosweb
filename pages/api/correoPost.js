import { poolcnx } from "../../db/config";
export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      res.json("GET!");

      break;

    case "POST":

      try {

        const nombre = req.body.nombre;
        const apellido = req.body.apellido;
        const tel = req.body.tel;
        const localidad = req.body.localidad;
        const correo = req.body.correo;
        const password = req.body.password;
        const uidusuario = req.body.uidusuario;

        const  insertQuery ="INSERT INTO mails SET ?"
        const user={nombre,apellido,tel,localidad,correo,uidusuario}

        await poolcnx.query(insertQuery,user, (err, results) => {
        if(err) {
            console.log("insert error");
            res.json(err);
            //send(err)
        }
        else {
            res.send({ error: false, data: results, message: 'user has been updated successfully.' });
        }
        return res.status(200).json();

    })

        
    } catch (error) {
        console.log("error: "+error.message);
        //res.send(err)
        
    }      
 

      res.json(req.body);
      console.log("body",req.body);

      break;

    default:
      break;
  }


  const postCorreos = async (req, res) => {
    

  }
}
