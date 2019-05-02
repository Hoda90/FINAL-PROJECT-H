$(document).ready(function () {

  var savedHolidays = [];
 

  function getSaved() {
    if (localStorage.getItem('savedHolidays') !== null) {
      savedHolidays = JSON.parse(localStorage.getItem('savedHolidays'));

      // savedArry = localStorage.getItem(blahblah)
      // some logic that gets items from local storage and assigns/pushes to savedHolidays
    }
  }
  getSaved();
  renderSavedData();

  $('#search-form').on('submit', function (event) {
    event.preventDefault();
    var year = $('#id').val();
    var contrycode = $('#id2').val();
    //console.log(year, contrycode);

    $.ajax({

      method: 'GET',
      url: 'https://date.nager.at/api/v2/PublicHolidays/' + year + '/' + contrycode,

      success: ajaxData,
      error: function (error) {
        console.error('error!!!', error);
      }
    });
  })
  var saved = $('.result');
  function ajaxData(result) {
    console.log(result);
   
    // saved.empty();
    console.log('saved is empty')

    for (let i = 0; i < result.length; i++) {
      console.log('appending!');
      console.log(result[i]);

     var holidayContainer = $('<div>').addClass('Container').appendTo(saved);
      //console.log($holidayContainer)
      $('<li>').attr('id', 'name' + i).text(result[i].name).appendTo(holidayContainer);
      $('<li>').attr('id', 'date' + i).text(result[i].date).appendTo(holidayContainer);
      $('<li>').attr('id', 'localName' + i).text(result[i].localName).appendTo(holidayContainer);
      $('<li>').attr('id', 'type' + i).text(result[i].type).appendTo(holidayContainer);
      //$holidayContainer.appendTo(saved);
     
      
      var button = $('<button>').attr('id', i).text('ADD');
      button.click(function () {
        var newSaved = {
          name:result[i].name,
          date: result[i].date,
          localName:result[i].localName,
          type:result[i].type
        }
        savedHolidays.push(newSaved);
        console.log(savedHolidays);
        localStorage.setItem('savedHolidays', JSON.stringify(savedHolidays));
        renderSavedData();
        localStorage.removeItem('savedHolidays');
        arsh();
        
      });  
      holidayContainer.append(button);

    }
    function arsh(){
      for(var i=0 ; i<savedHolidays.length;i++){
        savedHolidays.pop();
      }
      
    }
    
  }       
       var data = ('.data');
  function renderSavedData() {
    
    for (var i = 0; i < savedHolidays.length; i++) {
      var holidayContainer = $('<div>').addClass('Container').appendTo(data);
      $('<li>').attr('id', 'name' + i).text(savedHolidays[i].name).appendTo(holidayContainer);
      $('<li>').attr('id', 'date' + i).text(savedHolidays[i].date).appendTo(holidayContainer);
      $('<li>').attr('id', 'localName' + i).text(savedHolidays[i].localName).appendTo(holidayContainer);
      $('<li>').attr('id', 'type' + i).text(savedHolidays[i].type).appendTo(holidayContainer);
      $('<textarea>').appendTo(holidayContainer);
    }
    //var bs = $('<button>').text('SAVE').appendTo(holidayContainer);
  }
  




});
