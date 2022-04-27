const fs = require('fs')

class Contenedor{
    
    constructor(archivo){
        this.archivo = archivo
    }
    
    async save(objeto){
        try {
            let contenido = await fs.promises.readFile(`./${this.archivo}`,'utf-8')
            let content = JSON.parse(contenido)
            let idCorrelativo =content.length === 0 ? 1 : content[content.length-1].id+1//validación por si el array está vacío
            objeto = {//le di formato al objeto para que el id este primero
                "id": idCorrelativo,
                "title": objeto.title,
                "price": objeto.price,
                "thumbnail": objeto.thumbnail
            }
            content.push(objeto)
            
            await fs.promises.writeFile(`./${this.archivo}`,`${JSON.stringify(content)}`)
           console.log(`el ID asignado es ${idCorrelativo}`)
        } catch (error) {
            console.log(error) 
        }
    }

    async getById(id){
        try {
            let contenido = await fs.promises.readFile(`./${this.archivo}`,'utf-8')
            let content = JSON.parse(contenido)

            let objetoPorId = await content.find(elemento => elemento.id === id );
            if(objetoPorId === undefined){
                console.log('NULL')
            }else{
                console.log(objetoPorId)
            }
      
        } catch (err) {
            console.log(err)
        }
    }

     async getAll(){
        try {
            let contenido = await fs.promises.readFile(`./${this.archivo}`,'utf-8')
            let content = JSON.parse(contenido)
            return content
        } catch (err) {
            console.log(err)
        }
    }

    async deleteById(id){
        try {
            let contenido = await fs.promises.readFile(`./${this.archivo}`,'utf-8')
            let content = JSON.parse(contenido)

            let deletePorId = await content.map(elemento =>  elemento.id).indexOf(id);
            if(deletePorId < 0 ){
                console.log(`No se encontró el ID ${id} `)
            }else{
                await content.splice(deletePorId,1)
                await fs.promises.writeFile(`./${this.archivo}`,`${JSON.stringify(content)}`)
                .then(()=>console.log('Objeto eliminado'))
                .catch(err =>{console.log(err)})
            }
        } catch (err) {
            console.log(err)
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(`./${this.archivo}`,`[]`)
            .then(()=>console.log('Se eliminaron todos los elementos'))

        } catch (error) {
            console.log(error)
        }
        
    }

}

module.exports = Contenedor;

