from config import *

class Cliente(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100))
    password = db.Column(db.String(20))
    name = db.Column(db.String(20))
    email = db.Column(db.String(100))
    cpf = db.Column(db.String(20))
    rg = db.Column(db.String(20))
    celular = db.Column(db.String(20))
    endereco = db.Column(db.String(20))


    def __str__(self):
        return self.username + "[id = "+str(self.id)+ "], "+  self.password + ", " + self.name + ", " + self.email + ", " + self.cpf + ", " + self.rg + ", " + self.celular + ", " + self.endereco 
    
    def json(self):
        return {
            "id": self.id,
            "username": self.username,
            "password": self.password,
            "name": self.name,
            "email": self.email,
            "cpf": self.cpf,
            "rg": self.rg,
            "celular": self.celular,
            "endereco": self.endereco
        }

class Fornecedor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(254))
    name = db.Column(db.String(254))
    email = db.Column(db.String(254))
    cnpj = db.Column(db.String(254))


    def __str__(self):
        return self.username + "[id="+str(self.id)+ "], " +\
            self.name + ", " + self.email + ", " + self.cnpj
    def json(self):
        return {
            "id": self.id,
            "username": self.username,
            "name": self.name,
            "email": self.email,
            "cnpj": self.cnpj
        }


class Produto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    codigo_barras = db.Column(db.String(254)) 
    preco = db.Column(db.String(254)) 
    cliente_id = db.Column(db.Integer, db.ForeignKey(Cliente.id), nullable=False)
    cliente = db.relationship("Cliente")

    fornecedor_id = db.Column(db.Integer, db.ForeignKey(Fornecedor.id), nullable=False)
    fornecedor = db.relationship("Fornecedor")

    def __str__(self): 
        return self.codigo_barras + ", " + self.preco + ", " + str(self.cliente) + ", " + str(self.fornecedor)

    def json(self):
        return {
            "id":self.id,
            "codigo_barras":self.codigo_barras,
            "preco":self.preco,
            "cliente_id":self.cliente_id,
            "fornecedor_id":self.fornecedor_id,
            "cliente":self.cliente.json(),
            "fornecedor":self.fornecedor.json()  
        }


if __name__ == "__main__":

    if os.path.exists(arquivobd):
        os.remove(arquivobd)


    db.create_all()


    clienteum = Cliente(username = "Camz", password = "123", name = "Camila", email = "camilaparecida.k@gmail.com", cpf = "123456", rg = "7890", celular = "96439183", endereco = "Rua Acacio Bernardes")
    clientedois = Cliente(username = "Carol", password = "456", name = "Carolina", email = "carol.k@gmail.com", cpf = "78901", rg = "24356", celular = "9631393", endereco = "Rua Dr Pedro Zimmermman")
    clientetres = Cliente(username = "Le", password = "789", name = "Leticia", email = "leticia.k@gmail.com", cpf = "34566", rg = "1526", celular = "943526", endereco = "Rua Marilene Figueiredo Loch")
    

    db.session.add(clienteum)
    db.session.add(clientedois)
    db.session.add(clientetres)
    db.session.commit()
    

    print(clienteum)
    print(clientedois)
    print(clientetres)

    
    print(clienteum.json())
    print(clientedois.json())
    print(clientetres.json())

    fornecedorum = Fornecedor(username = "RedeTop", name = "Marcelo", email = "redetop@gmail.com", cnpj = "84103503")
    fornecedordois = Fornecedor(username = "Hanes", name = "Marcia", email = "hanes@gmail.com", cnpj = "25426346")
    
    db.session.add(fornecedorum)
    db.session.add(fornecedordois)
    db.session.commit()
    print(fornecedorum.json())
    print(fornecedordois.json())

    produtoum = Produto(codigo_barras= "01035820", preco = "R$10,00", cliente=clienteum, fornecedor=fornecedorum)

    db.session.add(produtoum)
    db.session.commit()

    print(produtoum)
    print(produtoum.json())
