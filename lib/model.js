var Inflector = require('inflected');
var tpl = require('tpl_apply');
var moment = require('moment');
var debug = require('../lib/debug');

var Sequelize = {
  STRING:'Sequelize.STRING'
}
// movies_controller
function g(o) {
  this.created_at = moment().format('MMMM Do YYYY, h:mm:ss a');
  this.entity = Inflector.camelize(o.model.entity);
  this.attrs = JSON.stringify(o.model.attr);
    // debug(o);
  this.model  = o.model.entity;
  this.models = Inflector.pluralize(o.model.entity);
  this.out_file_name = o.model_path  +'/'+ o.model.entity + ".js";
  this.source_file = o.root_path + '/tpl/' + o.framework + '/models/movie.js'
  
  // debug(this);
  
  var source = this.source_file;
  var dest = this.out_file_name

  this.mongoose_attrs = get_mongoose_type_attrs(o.model.attr);

  tpl.tpl_apply(source, this, dest);
}
// name:string
function get_mongoose_type_attrs(attrs){
  var _attrs = [{ name: "id", column: "id", primaryKey: true, type: 'Toshihiko.Type.Integer', autoIncrement: true }]
  
  
  for(var k in attrs){
    console.log(k)
    var _new_type = _decode_mongoose_type(attrs[k]);
    console.log(_new_type)
    // {
//       name: 'username',
//       type: Toshihiko.Type.String
//     }
    // _attrs[k] =  k + ", type: " + _new_type + "}";
    
    _attrs.push({name: k, type: 'Toshihiko.Type.String'})
  }
  
  debug('_attrs = ' + _attrs)
  console.dir( _attrs)
  
  var r= JSON.stringify(_attrs).replace(/\"Toshihiko\.Type\.String\"/g,'Toshihiko.Type.String')
  r= r.replace(/\"Toshihiko\.Type\.Integer\"/g,'Toshihiko.Type.Integer')
  return r.replace(/{/g,'\n\t\t{')
}
/**
  • String -> string
  • Number-> number
  • Date -> date
  • Boolean -> boolean
  • Buffer -> buffer
  • ObjectId -> object
  • Mixed  -> mixed
  • Array -> array
*/ 
function _decode_mongoose_type(type){
  var _t = type.toLowerCase();
  
  if(_t == 'object' || _t == 'objectid' || _t == 'objectId'){
    _t = 'objectId';
  }
  
  return "Toshihiko.Type.String"
  return Inflector.camelize(_t);
}

module.exports = g;