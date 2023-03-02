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
                console.log('Producto encontrado', busqueda)
            } else { error();}
        })
         .catch (error => {
            console.log("Product not found")
        })
    }

    // getProductsById (id) {
             
    //     const data = fs.readFile(this.path, 'utf-8')
        
    //     data = JSON.parse(data)

    //     const busqueda = data.find(e => e.id === id)

    //     if(busqueda != undefined) {
    //         return console.log(busqueda)
    //     }else {
    //         console.log('error product not found')
    //     }

    // }

    updateProduct () {

    }

    deleteProduct () {

    }
}


const newProduct = new ProductMannager('./products.json')

newProduct.addProduct('batoque acro', 'impreso en 3D', 80, 'imgRoute', 1243, 15)
newProduct.addProduct('batoque xc', 'impreso en 3D', 200, 'imgRoute', 1244, 15)
newProduct.addProduct('emotion3', 'parapente', 2800, 'imgRoute', 2000, 1)
newProduct.addProduct('pica2', 'parapente', 3500, 'imgRoute', 2001, 1)


//newProduct.getProducts() 

newProduct.getProductsById(4)