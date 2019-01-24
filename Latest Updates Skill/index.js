"use strict";
const Alexa = require('alexa-sdk');
var cheerio = require('cheerio');
require("request/package.json");
var rp = require('request-promise');
var APP_ID="amzn1.ask.skill.#####################";

var annh = []; //List that stores the announcements
var events=[];
var workshops=[];
//scrapes SRM's announcements page on intentrequest and returns a promise to return list of announcements
var dayOrders = {
            "01 04" : "a holiday",
            "01 05" : "a holiday",
            "02 04" : 2,
            "02 05" : 3,
            "03 04" : 3,
            "03 05" : 4,
            "04 04" : 4,
            "04 05" : 5,
            "05 04" : 5,
            "05 05" : "a holiday",
            "06 04" : 1,
            "06 05" : "a holiday",
            "07 04" : "a holiday",
            "07 05" : 1,
            "08 04" : "a holiday",
            "09 04" : 2,
            "10 04" : 3,
            "11 04" : 4,
            "12 04" : 5,
            "13 04" : 1,
            "14 04" : "a holiday",
            "15 04" : "a holiday",
            "16 04" : 2,
            "17 04" : 3,
            "18 04" : 4,
            "19 04" : 5,
            "20 03" : 5,
            "20 04" : 1,
            "21 03" : 1,
            "21 04" : "a holiday",
            "22 03" : 2,
            "22 04" : "a holiday",
            "23 03" : 3,
            "23 04" : 2,
            "24 03" : "a holiday",
            "24 04" : 3,
            "25 03" : "a holiday",
            "25 04" : 4,
            "26 03" : 4,
            "26 04" : 5,
            "27 03" : 5,
            "27 04" : 1,
            "28 03" : 1,
            "28 04" : "a holiday",
            "29 03" : "a holiday",
            "29 04" : "a holiday",
            "30 03" : "a holiday",
            "30 04" : 2,
            "31 03" : "a holiday"
}

var fetchAnnounce = () => {
            var options = {
                uri: 'http://www.srmuniv.ac.in/featured-announcements',
                transform: function (body) {
                    return cheerio.load(body);
                }
            };
            return new Promise(function(resolve,reject){
                rp(options)
                    .then(function ($) {
                        $('.field-content').each(function (i, elem) {
                            var announce = {
                                'head': $(this).find('h4').text(),
                                'desc': $(this).find('.rtejustify').text()
                            }
                            annh.push(announce);
                        });
                        resolve(annh);
                    })
                    .catch(function (err) {
                        reject(err);
                    })
                });
}

var fetchEvents = () => {
    var options = {
        uri: 'http://www.srmuniv.ac.in/featured-events',
        transform: function (body) {
            return cheerio.load(body);
        }
    }

    return new Promise(function (resolve, reject) {
        rp(options)
            .then(function ($) {
                $('.field-content').each(function (i, elem) {
                    var appendSt = $(this).find('.h4').after('code:'),
                        content = $(this).find("td[valign='top']").clone().children().remove().end().text(),
                        reg = content.replace(/code:([^xyz]+)/, '');
                    var announce = {
                        'head': $(this).find('h4').text(),
                        'date': reg
                    };
                    events.push(announce);
                });
                resolve(events);
                //console.log(events);
            })
            .catch(function (err) {
                reject(err);
                //console.log(err);
            });
    });
}

var fetchWorkshops = () => {
    var options = {
        uri: 'http://www.srmuniv.ac.in/featured-events',
        transform: function (body) {
            return cheerio.load(body);
        }
    }

    return new Promise(function (resolve, reject) {
        rp(options)
            .then(function ($) {
                $('.field-content').each(function (i, elem) {
                    var appendSt = $(this).find('.h4').after('code:'),
                        content = $(this).find("td[valign='top']").clone().children().remove().end().text(),
                        reg = content.replace(/code:([^xyz]+)/, '');
                    var workshop = {
                        'head': $(this).find('h4').text(),
                        'date': reg
                    };

                    if(workshop.head.toLowerCase().includes("workshop") || workshop.head.toLowerCase().includes("conference")){
                        workshops.push(workshop);
                    }
                });
                resolve(workshops);
                //console.log(workshops);
            })
            .catch(function (err) {
                reject(err);
                //console.log(err);
            });
    });
}
function responseStringAlt(responseString){
    responseString = responseString.replace('&', 'and').replace('-', '')
    .replace('SRMJEEE','<say-as interpret-as="spell-out">SRMJEEE</say-as>')
    .replace('AP','Andhra Pradesh')
    .replace('\'','')
    .replace(" \ "," and ");
    return responseString;
}
function formatDate(theDate){
    theDate=theDate.replace('\n','').replace('\t','').replace(',','').trim();
    return theDate;
}
function titleCaser(topic){
    var splitted=topic.split(' ')
    .map((topicstr)=>(topicstr.charAt(0).toUpperCase() + topicstr.slice(1)));
    return splitted.join('');
}
//All the Handlers 

const handlers = {
    'LaunchRequest': function(){     
        var welcome = "You can ask me for important announcements <break-time=\"1s\"/>events<break-time=\"1s\"/>workshops on a specific subject<break-time=\"1s\"/> and even what day order it is"; 
        this.emit(':tell',welcome);
    },
    'GetAnnouncements': function (){
        var that=this; // 'cause this ends up binding to the wrong object
        var responseString='';
            fetchAnnounce().then((response)=>{
                let i;
                for(i=0;i<3;i++){
                        responseString=responseString+responseStringAlt(response[i].head)+'<break time="1s"/>'+responseStringAlt(response[i].desc)+''+'<break time="2s"/>';
                }
                that.emit(':tell',responseString);
            },(error)=>{
                that.emit(':tell','We have encountered an error');
            });
        },
    'GetEvents': function(){
        var that=this;
        var responseString='';
        fetchEvents().then((response)=>{
            let i;
                for(i=0;i<4;i++){
                    responseString=responseString+'On '+
                    formatDate(response[i].date)+' we have '+response[i].head+' '+'<break time="2s"/>';
                }
            //that.response.speak(responseString);
            that.emit(':tell',responseString);
            //that.emit(':tell','This is events');
            },(error) => {
                that.emit(':tell','We have encountered an error');
            });
    },
    'GetWorkShops': function(){
        var that = this;
        var responseString='';
        var topic=this.event.request.intent.slots.wtopic.value;
        fetchWorkshops().then((response)=>{
            let i;
            for (i = 0; i < 4; i++) {
                if (typeof topic !== "undefined"){
                    if (response[i].head.includes(topic) || response[i].head.includes(titleCaser(topic))){
                        responseString = responseString + 'On ' +
                            formatDate(response[i].date) + ' we have ' + response[i].head + ' ' + '<break time="2s"/>';
                    }
                }
                else{
                    responseString = responseString + 'On ' +
                        formatDate(response[i].date) + ' we have ' + response[i].head + ' ' + '<break time="2s"/>';
                }
            }
            //that.response.speak(responseString);
            if(responseString!=""){
               that.response.speak(responseString);
               that.emit(':responseReady');
            }
            else{
                var erromsg='I am sorry we have no workshops coming up on the subject you requested';
                that.response.speak(errormsg);
                that.emit(':responseReady');
            }
            //that.emit(':tell','This is events');
        }, (error) => {
            that.response.speak('We have encountered an error');
            that.emit(':responseReady');
        });
    },
    'GetDayOrders': function(){
        var DO=String(this.event.request.intent.slots.dayorder.value);
        var da=DO.split('-');
        var refDate=da[2]+" "+da[1];
        if(dayOrders[refDate]==="a holiday"){
            this.response.speak('It is a holiday');
            this.emit(':responseReady');
        }
        else{
            this.response.speak('It is day order '+String(dayOrders[refDate]));
            this.emit(':responseReady');
        }
    },
    'SessionEndedRequest': function(){
        this.response.speak('I am sorry but there was an issue in processing your request');
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        let help = "You can ask me for important announcements<break-time=\"1s\"/>events<break-time=\"1s\"/>workshops on a specific subject<break-time=\"1s\"/> and even what day order it is";
        this.response.speak(help);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        // Handler for the built-in StopIntent
        this.response.speak('Happy to help');
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        // Handler for the built-in CancelIntent
        this.response.speak('Cancelling your request');
        this.emit(':responseReady');
    },
    'Unhandled': function () {
        const message = 'Please ask me for what you\'d like to know';
        this.emit(':tell',message);
    }
};
exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event,context);
    alexa.appId=APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
