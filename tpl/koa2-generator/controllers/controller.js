"use strict";

/**
 * Created by Moajs on {{created_at}}.
 */

var {{entity}} = $models.{{model}};

exports.list = function *(ctx, next) {
  console.log(ctx.method + ' /{{models}} => list, query: ' + JSON.stringify(ctx.query));
  
  let {{models}} = yield {{entity}}.find().$promise
  
  yield ctx.render('{{models}}/index', {
    {{models}} : {{models}}
  })
};

exports.new = function *(ctx, next) {
  console.log(ctx.method + ' /{{models}}/new => new, query: ' + JSON.stringify(ctx.query));

  yield ctx.render('{{models}}/new', {
    {{model}} : {
      "_action" : "new"
    }
  });
};

exports.show = function *(ctx, next) {
  console.log(ctx.method + ' /{{models}}/:id => show, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params));
  let id = ctx.params.id;
  let {{model}} = yield {{entity}}.where({
    id: id
  }).findOne().$promise
  
  console.log({{model}});
  
  yield ctx.render('{{models}}/show', {
    {{model}} : {{model}}
  });
};

exports.edit = function *(ctx, next) {
  console.log(ctx.method + ' /{{models}}/:id/edit => edit, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params));

  let id = ctx.params.id;

  let {{model}} = yield {{entity}}.where({
    id: id
  }).findOne().$promise
  
  console.log({{model}});
  {{model}}._action = 'edit';

  yield ctx.render('{{models}}/edit', {
    {{model}} : {{model}}
  });
};

exports.create = function *(ctx, next) {
  console.log(ctx.method + ' /{{models}} => create, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));

  let {{model}} = yield {{entity}}.build({{keypair}}).insert().$promise
  
  console.log({{model}});
  yield ctx.render('{{models}}/show', {
    {{model}} : {{model}}
  });
};

exports.update = function *(ctx, next) {
  console.log(ctx.method + ' /{{models}}/:id => update, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));

  let id = ctx.params.id;

  let {{model}} = yield {{entity}}.where({
    id: id
  }).findOne().$promise
  
  {{model}} = yield {{model}}.updateByJson({{keypair}}).$promise
  
  yield ctx.body = ({
    data:{
      redirect : '/{{models}}/' + id
    },
    status:{
      code : 0,
      msg  : 'delete success!'
    }
  });
};

exports.destroy = function *(ctx, next) {
  console.log(ctx.method + ' /{{models}}/:id => destroy, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));
  let id = ctx.params.id;
  
  yield {{entity}}.where({
      id: id
    }).delete().$promise
  
  yield ctx.body= ({
    data:{},
    status:{
      code : 0,
      msg  : 'delete success!'
    }
  });
};

// -- custom

// -- custom api
exports.api = {
  list: function *(ctx, next) {
    let api_user_id = ctx.api_user.id;

    let {{models}} = yield {{entity}}.find().$promise
    
    yield ctx.api({
      {{models}} : {{models}}
    })
  },
  show: function *(ctx, next) {
    let api_user_id = ctx.api_user.id;
    let id = ctx.params.{{model}}_id;

    let {{model}} = yield {{entity}}.where({
      id: id
    }).findOne().$promise
    
    yield ctx.api({
      {{model}} : {{model}}
    });
  },
  create: function *(ctx, next) {
    let api_user_id = ctx.api_user.id;

    let {{model}} = yield {{entity}}.build({{keypair}}).insert().$promise
    
    yield ctx.body = ({
      {{model}} : {{model}}
    });
  },
  update: function *(ctx, next) {
    let api_user_id = ctx.api_user.id;
    let id = ctx.params.{{model}}_id;
    
    let {{model}} = yield {{entity}}.where({
      id: id
    }).findOne().$promise
    
    {{model}} = yield {{model}}.updateByJson({{keypair}}).$promise
    
    yield ctx.api({
      {{model}} : {{model}},
      redirect : '/{{models}}/' + id
    });
  },
  delete: function *(ctx, next) {
    let api_user_id = ctx.api_user.id;
    let id = ctx.params.{{model}}_id;

    yield {{entity}}.where({
      id: id
    }).delete().$promise
    
    yield ctx.api({id: id});
  }
}
