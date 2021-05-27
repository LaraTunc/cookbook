import { Server, Model, Factory, RestSerializer, Serializer, ActiveModelSerializer, JSONAPISerializer, Collection, Response, belongsTo, hasMany } from 'miragejs'

const server = new Server({

    models: {
        recipe: Model.extend(),
        ingredient: Model.extend({
            recipe: hasMany()    
        }),
    },

    serializers: {
        application: RestSerializer
    },

    routes() {
        this.namespace = ''

        this.get("/recipes/", (schema, request) => schema.recipes.all().models)
        this.get("/recipes/:id", (schema, request) => {
            return schema.recipes.find(request.params.id).attrs  
        })
        this.post("/recipes/", function (schema, request) {
            let attrs = JSON.parse(request.requestBody)
            return schema.recipes.create(attrs).attrs
        })
        this.put("/recipes/:id", function (schema, request) {
            let id = request.params.id
            let attrs = JSON.parse(request.requestBody)
            return schema.recipes.find(id).update(attrs).attrs
        })
        this.patch("/recipes/:id", function (schema, request) {
            let id = request.params.id
            let attrs = JSON.parse(request.requestBody)
            return schema.recipes.find(id).update(attrs).attrs
        })
        this.del("/recipes/:id")

        this.get("/ingredients/", (schema, request) => schema.ingredients.all().models)
        this.get("/ingredients/:id", (schema, request) => {
            return schema.ingredients.find(request.params.id).attrs  
        })
        this.post("/ingredients/", function (schema, request) {
            let attrs = JSON.parse(request.requestBody)
            return schema.ingredients.create(attrs).attrs
        })
        this.put("/ingredients/:id", function (schema, request) {
            let id = request.params.id
            let attrs = JSON.parse(request.requestBody)
            return schema.ingredients.find(id).update(attrs).attrs
        })
        this.patch("/ingredients/:id", function (schema, request) {
            let id = request.params.id
            let attrs = JSON.parse(request.requestBody)
            return schema.ingredients.find(id).update(attrs).attrs
        })
        this.del("/ingredients/:id")
    },
    
})

server.db.loadData({
    ingredients: [
        { 
            id: 1, 
            name: 'fries',
            vegetarian: true,
            calories: 312
        },
        { 
            id: 2, 
            name: 'cheese',
            vegetarian: true,
            calories: 402
        },
        { 
            id: 3, 
            name: 'gravy',
            vegetarian: false,
            calories: 79
        },
    ],
    recipes: [
        { 
            id: 1, 
            name: 'poutine',
            ingredients: [1, 2, 3]

        },
    ]
})

export default server

