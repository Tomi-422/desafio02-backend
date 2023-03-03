const fs = require('fs')

class ProductMannager {
    static id = 1
    
    constructor (path) {
        this.products = []
        this.path = path 
    }

    addProduct (title, description, price, thumbnail, code, stock) {
        // const {} = product
        
        const productInfo = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductMannager.id
        }

        const addToproducts = async () => {
            const data =fs.readFileSync(this.path, 'utf-8')
            const prod = JSON.parse(data)
            this.products.push(prod)
            await addToproducts()
        }

        this.products.push(productInfo)
        ProductMannager.id ++

        fs.writeFileSync(this.path, JSON.stringify(this.products))
    }

    getProducts = async () => {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const prod = JSON.parse(data)
        return console.log(prod)
    }

    getProductsById(id) {
        const data = fs.promises.readFile(this.path,'utf-8')
        .then(data => {
            data = JSON.parse(data)
            const busqueda = data.find(e => e.id == id)
            if(busqueda != undefined){
               return console.log('Producto encontrado', busqueda)
            } else { error();}
        })
         .catch (error => {
           return console.log("Product not found")
        })
    }

    updateProduct = async (title, description, price, thumbnail, code, stock, id) => {

        const product = ({
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id
        })

        let data = await fs.promises.readFile(this.path,'utf-8')
        
        data = await JSON.parse(data)
        let busqueda = await data.filter(e => e.id != id)

        await fs.promises.writeFile(this.path, JSON.stringify(busqueda))

        data = await fs.promises.readFile(this.path, 'utf-8')
        .then(data => {
            fs.appendFileSync(this.path, JSON.stringify(product))
            console.log('Producto modificado con exito')
        })
    }

    deleteProduct = async (id) => {
        try {
        let data = await fs.promises.readFile(this.path,'utf-8')
        
            data = await JSON.parse(data)
            let busqueda = await data.filter(e => e.id != id)
            let res = await data.some(e => e.id == id)


            if (res == false)
            {
                error();
            }else if (busqueda != undefined) {
                await fs.promises.writeFile(this.path, JSON.stringify(busqueda))
                data = await fs.promises.readFile(this.path,'utf-8')
                .then(data => {
                    console.log("Se a eliminido el producto")
                    })
                }
        } catch(error) {
                await console.log("El producto no existe")
            }
    }
}


const newProduct = new ProductMannager('./products.json')

newProduct.addProduct('batoque acro', 'impreso en 3D', 80, 'imgRoute', 1243, 15)
newProduct.addProduct('batoque xc', 'impreso en 3D', 200, 'imgRoute', 1244, 15)
newProduct.addProduct('emotion3', 'parapente', 2800, 'imgRoute', 2000, 1)
newProduct.addProduct('pica2', 'parapente', 3500, 'imgRoute', 2001, 1)


//newProduct.updateProduct('batoque acro', 'impreso en resina', 100, 'imgRoute', 1243, 1, 1 )
//newProduct.getProductsById(1)

newProduct.getProducts()

//newProduct.deleteProduct(2)

