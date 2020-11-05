class Helpers {

  handleBoolean(value){
    if (value === undefined || value === null || value==""){
      return undefined;
    }
    return value && value!=="false"
  }
  
}

module.exports = new Helpers();