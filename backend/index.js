
const http = require('http')
const fs = require('fs')





const produtos = [
    {id: 1, nome: 'Sofá', preco: 599.90, estoque: 4},
    {id: 2, nome: 'Poltrona', preco: 899.90, estoque: 2},
    {id: 3, nome: 'Puff', preco: 199.90, estoque: 10}
]

const dados = JSON.parse(fs.readFileSync('dados.json', 'utf-8'))

//Funções
function cadastrar(novoProduto){
   
    
    try {

        dados.produtos.push(JSON.parse(novoProduto))
        fs.writeFileSync('dados.json', JSON.stringify(dados))
        return 'Produto cadastrado com sucesso!'
        
    } catch (error) {
        return 'erro ao cadastrar produto'
    }
   
}

function listarProdutos(){

    
    try {
        return JSON.stringify(dados.produtos)

    } catch (error) {
        return ' erro ao listar produtos'
    }
}







  
  



//Iniciar servidor
const servidor = http.createServer((req, res) => {

    //requisições
    if(req.url == '/produto'){
       
        //tipo do método da requisição
        switch(req.method){

            //cadastrar
            case 'POST':

                let data = ''
                req.on('data', (chunck) =>{
                    data += chunck
                })

                req.on('end', () => {
                    res.writeHead(200, {'Content-Type': 'application/json; charset: utf-8'})
                    res.end(cadastrar(data))
                })
                break

                //listar
                case 'GET':
                    //const lista = listarProdutos()
                    res.writeHead(200, {'Content-Type': 'application/json; charset: utf-8'})
                    res.end(listarProdutos())
                    break

                    //outros métodos...
                    default:
                        res.writeHead(200, {'Content-Type': 'text/plain; charset: utf-8'})
                        res.end('Método ainda não implementado')
                        break
                        
                       
        }


    } 
    
    
    else {
        res.writeHead(200, {'Content-Type': 'text/plain; charset: utf-8'})
        res.end('O endpoint padrão é "/produto"')
    }
       
})

servidor.listen(3000)