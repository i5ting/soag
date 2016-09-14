"use strict";

/**
 * Created by Moajs on {{created_at}}.
 */

var {{entity}} = $models.{{model}};


exports.list = (ctx, next) => {
  console.log(ctx.method + ' /{{models}} => list, query: ' + JSON.stringify(ctx.query));

  return {{entity}}.find().$promise.then(( {{models}})=>{
    return ctx.render('{{models}}/index', {
      {{models}} : {{models}}
    })
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

exports.new = (ctx, next) => {
  console.log(ctx.method + ' /{{models}}/new => new, query: ' + JSON.stringify(ctx.query));

  return ctx.render('{{models}}/new', {
    {{model}} : {
      "_action" : "new"
    }
  })
};

exports.show = (ctx, next) => {
  console.log(ctx.method + ' /{{models}}/:id => show, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params));
  var id = ctx.params.id;

  return {{entity}}.where({
    id: id
  }).findOne().$promise.then( {{model}} => {
    console.log({{model}});
    return ctx.render('{{models}}/show', {
      {{model}} : {{model}}
    })
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

exports.edit = (ctx, next) => {
  console.log(ctx.method + ' /{{models}}/:id/edit => edit, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params));

  var id = ctx.params.id;

  return {{entity}}.where({
    id: id
  }).findOne().$promise.then( {{model}} => {
    console.log({{model}});
    {{model}}._action = 'edit';

    return ctx.render('{{models}}/edit', {
      {{model}} : {{model}}
    })
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

exports.create = (ctx, next) => {
  console.log(ctx.method + ' /{{models}} => create, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));

  return {{entity}}.build({{keypair}}).insert().$promise.then( {{model}} => {
    console.log({{model}});
    return ctx.render('{{models}}/show', {
      {{model}} : {{model}}
    })
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

exports.update = (ctx, next) => {
  console.log(ctx.method + ' /{{models}}/:id => update, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));

    var id = ctx.params.id;

    return {{entity}}.where({
      id: id
    }).findOne().$promise.then( {{model}} => {
      return {{model}}.updateByJson({{keypair}}).$promise
    }).then( {{model}} => {
      console.log({{model}});

      return ctx.body = ({
        data:{
          redirect : '/{{models}}/' + id
        },
        status:{
          code : 0,
          msg  : 'delete success!'
        }
      });
    });
};

exports.destroy = (ctx, next) => {
  console.log(ctx.method + ' /{{models}}/:id => destroy, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));
  var id = ctx.params.id;
  return {{entity}}.where({
    id: id
  }).delete().$promise.then( () =>{
    return ctx.body= ({
      data:{},
      status:{
        code : 0,
        msg  : 'delete success!'
      }
    });
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

// -- custom

// -- custom api
exports.api = {
  list: (ctx, next) => {
    let api_user_id = ctx.api_user.id;

    return {{entity}}.find().$promise.then(({{models}}) => {
      return ctx.api({
        {{models}} : {{models}}
      })
    }).catch((err)=>{
      return ctx.api_error(err);
    });
  },
  show: (ctx, next) => {
    let api_user_id = ctx.api_user.id;
    var id = ctx.params.{{model}}_id;

    return {{entity}}.where({
      id: id
    }).findOne().$promise.then(({{model}})=>{
      return ctx.api({
        {{model}} : {{model}}
      });
    }).catch((err)=>{
      return ctx.api_error(err);
    });
  },
  create: (ctx, next) => {
    let api_user_id = ctx.api_user.id;

    return {{entity}}.build({{keypair}}).insert().$promise.then({{model}}=> {
      return ctx.body = ({
        {{model}} : {{model}}
      })
    }).catch((err)=>{
      return ctx.api_error(err);
    });

  },
  update: (ctx, next) => {
    let api_user_id = ctx.api_user.id;
    var id = ctx.params.{{model}}_id;
    return {{entity}}.where({
      id: id
    }).findOne().$promise.then( {{model}} => {
      return {{model}}.updateByJson({{keypair}}).$promise
    }).then( {{model}} => {
      return ctx.api({
        {{model}} : {{model}},
        redirect : '/{{models}}/' + id
      })
    }).catch((err)=>{
      return ctx.api_error(err);
    });
  },
  delete: (ctx, next) => {
    let api_user_id = ctx.api_user.id;
    var id = ctx.params.{{model}}_id;

    return {{entity}}.where({
      id: id
    }).delete().$promise.then(function(){
      return ctx.api({id: id})
    }).catch((err)=>{
      return ctx.api_error(err);
    }); 
  }
}
