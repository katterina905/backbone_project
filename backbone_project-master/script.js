console.info('Start app!');

$(function(){


    AJAX_RESULT = [];
    var ModelProduct = Backbone.Model.extend({

        initialize: function () {
            console.info('mint model product')
        },

        defaults:{
            id: 'defaults_id',
            title: 'defaults_title',
            image:'defaults_img',
            text:'defaults_text'
        }

    });

    var ModelRecall = Backbone.Model.extend({

        initialize: function () {
            console.info('mint model recall')
        },

        defaults:{
            id: '',
            rate: '',
            id_user:'',
            id_entry:''
        }

    });

    var ModelUser = Backbone.Model.extend({

        initialize: function () {
            console.info('mint model user')
        },

        defaults:{
            id: '',
            username: '',
            password:''
        }
    });

    var CollectionProduct = Backbone.Collection.extend({
        model: ModelProduct,
    });

    var CollectionRecall = Backbone.Collection.extend({
        model: ModelRecall
    });

    var CollectionUser = Backbone.Collection.extend({
        model: ModelUser
    });

    // Requests for information about the product
     $.ajax
        ({
            type    : 'GET',
            url     : 'http://smktesting.herokuapp.com/api/products/',
            async   : false,
            data    : {},

            success : function(result) {
                AJAX_RESULT = result;
            }
        });

      // Requests for information about the product
      $.ajax
         ({
             type    : 'GET',
             url     : 'http://smktesting.herokuapp.com/api/products/',
             async   : false,
             data    : {},

             success : function(result) {
                 AJAX_RESULT = result;
             }
         });

    var collectionProduct = new CollectionProduct(AJAX_RESULT);

    var ViewLi = Backbone.View.extend({

        tagName: 'li',
        template: _.template($('#viewLi').html()),

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    var ViewUl = Backbone.View.extend({
      tagName: 'section',
      template: _.template($('#viewUl').html()),

      render: function(){
        this.$el.html(this.template());
        this.collection.each(
          function(ModelProduct){
            var viewLi = new ViewLi({model:ModelProduct});
            this.$('ul').append(viewLi.render().el)
          },
          this);
          return this;
      }
    });

    var viewUl = new ViewUl({collection: collectionProduct});
    $(document.body).append(viewUl.render().el);


    });
