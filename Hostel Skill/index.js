const Alexa = require("alexa-sdk");
var hosteltype;
var typeDorI;
var informationtype;
var gbhosteltypevalue;
var handlers = {
  'helloIntent': function() {
  	 this.response.speak("Hello, Welcome to SRM Hostel Helpdesk! Are you looking for Information about either boys or girls hostel? or Contact numbers of the concerned authorities? or the Fee Structure? ").listen();
    this.emit(':responseReady');
  },
  
    'informationIntent': function(){
    informationtype = this.event.request.intent.slots.infotype.value;
    if(informationtype=="information" || informationtype=="info" || informationtype=="details")
    {
     this.response.speak("Sure thing! Do you want to know about boys hostel or girls hostel? ").listen();
     this.emit(':responseReady');
     }
     else if(informationtype=="phone" || informationtype=="mobile" || informationtype=="contact")
     {
      this.response.speak("You can contact Director: Campus life at 044 27453159 or mail him at d i r e c t o r . c l @ s r m u n i v . a c . i n");
      this.emit(':responseReady');
     }
     else if((informationtype=="fees" || informationtype=="fee" || informationtype=="money"))
     {
      this.response.speak("The hostel fees range from 99500 to 290000.");
      this.emit(':responseReady');
     }
    },
    
    'hostelIntent': function() {
    hosteltype = this.event.request.intent.slots.hostel.value;
    if(hosteltype == "girls" || hosteltype == "ladies" || hosteltype == "women")
    {
     this.response.speak(hosteltype+ " hostel are of two types: Domestic and International. Which one do you want to know more about?").listen();
     this.emit(':responseReady');
    }
    else if(hosteltype == "boys" || hosteltype == "gents" || hosteltype == "men")
    {
     this.response.speak(hosteltype+ " hostel are of two types: Domestic and International. Which one do you want to know more about?").listen();
     this.emit(':responseReady');
    }
    },
    
    'typeIntent': function() {
    typeDorI = this.event.request.intent.slots.type.value;
    if((typeDorI == "domestic")&&(hosteltype == "girls" || hosteltype == "ladies" || hosteltype == "women"))
    {
     this.response.speak("Domestic Hostels for "+hosteltype+" are: Manoranjitham, Mullai, Malligai, Thamarai, Staff Quarters A, Staff Quarters B and the newly built M Block").listen();
     this.emit(':responseReady');
    }
    else if((typeDorI == "international")&&(hosteltype == "girls" || hosteltype == "ladies" || hosteltype == "women"))
    {
     this.response.speak("International hostels for "+hosteltype+ " are: Kalpana Chawla, Meenakshi and the co-ed NRI hostel").listen();
     this.emit(':responseReady');
    }
    else if((typeDorI == "domestic")&&(hosteltype == "boys" || hosteltype == "gents" || hosteltype == "men"))
    {
     this.response.speak("Domestic hostels for "+hosteltype+ " are: Oori, Paari, Kaari, Adhiyaman, PF, Sannasi A, Sannasi B, Sannasi C and the T.R.S Hostel").listen();
     this.emit(':responseReady');
    }
    else if((typeDorI == "international")&&(hosteltype == "boys" || hosteltype == "gents" || hosteltype == "men"))
    {
     this.response.speak("International hostels for "+hosteltype+ " are: Nelson Mandela, co-ed NRI hostel").listen();
     this.emit(':responseReady');
    }
    },
    
    'gbHostelIntent': function() {
    gbhosteltypevalue = this.event.request.intent.slots.gbhosteltype.value;
    gbhosteltypevalue = gbhosteltypevalue.toLowerCase();
    if((gbhosteltypevalue == "mullai") || (gbhosteltypevalue == "d"))
    {
     this.response.speak(gbhosteltypevalue + " is named after the flower Mullai famous for its lovely fragrance. It consists of 6 floors with 27 rooms in each floor. Rooms in Mullai Block are triple sharing, non-ac and non-attached washrooms. 2nd, 3rd and 4th year students reside in Mullai Block. Fee structure for mullai block is 99500");
     this.emit(':responseReady');
    }
    else if((gbhosteltypevalue == "malligai") || (gbhosteltypevalue == "f"))
    {
     this.response.speak(gbhosteltypevalue + "hostel block also known as the F Block is also named after a famous flower. It consists of 6 floors with 27 rooms in each floor. Rooms in Malligai Block are triple sharing, non-ac and non-attached washrooms. However, the 6th floor in Malligai block consists of AC rooms. 2nd, 3rd and 4th year students reside in Malligai Block. Fee structure for malligai block is 99500 for non-ac and 215000 for ac rooms. It houses a student committee for recreation, mess and housekeeping. Hostel life is always full of excitement and one could always cherish their memories.");
     this.emit(':responseReady');
    }
    else if((gbhosteltypevalue == "thamarai") || (gbhosteltypevalue == "e"))
    {
     this.response.speak(gbhosteltypevalue + " block is named after the lotus flower. Lotus is the sacred flower of India. It occupies a special position in the art and mythology of ancient India. It is also the National Flower of India. It symbolizes divinity, fertility, wealth and knowledge. In India it is considered as the symbol of triumph. As it is rooted in the mud it can survive to regerminate for thousand of years. It represents long life, honour and good fortune. It consists of 6 floors with 27 rooms in each floor. Rooms in Thamarai Block are triple sharing, non-ac and have non-attached washrooms. 2nd, 3rd and 4th year students reside in Thamarai Block. Fee structure for Thamarai block is 99500");
     this.emit(':responseReady');
    }
    else if((gbhosteltypevalue == "manoranjitham") || (gbhosteltypevalue == "k"))
    {
     this.response.speak(gbhosteltypevalue + " block students hail from different states of India, diverse cultures and varied economic and financial backgrounds. They live in three shared accommodations with non-attached washrooms. This hostel primarily consists of the 1st years students. The hostel block is a miniature model of the world outside with people of different habits, temperaments, living style, language and outlook staying and working together. This develops the qualities of understanding and adjustment and sharing and caring amongst the students. It nurtures virtues like adaptability, tolerance and sacrifice developing students into noble and responsible citizens. The hostel block is a self sufficient unit housing all the basic necessities of the students.Fee structure for Manoranjitham block is 99500. ");
     this.emit(':responseReady');
    }
    else if((gbhosteltypevalue == "esq a") || (gbhosteltypevalue == "engineering staff quarters a") || (gbhosteltypevalue == "staff quarters a")) 
    {
     this.response.speak(gbhosteltypevalue + " is a 3 bhk flat with four sharing, triple sharing and double sharing rooms. Students from Faculty of Science and Technology, Faculty of Science and Humanities, Management, Law stay together in these blocks. The hostel block is a self sufficient unit housing all the basic necessities of the students.");
     this.emit(':responseReady');
    }
    else if((gbhosteltypevalue == "esq b") || (gbhosteltypevalue == "engineering staff quarters b") || (gbhosteltypevalue == "staff quarters b")) 
    {
     this.response.speak(gbhosteltypevalue + " is a 3 bhk flat with four sharing, triple sharing and double sharing rooms. Students from Faculty of Science and Technology, Faculty of Science and Humanities, Management, Law stay together in these blocks. The hostel block is a self sufficient unit housing all the basic necessities of the students.");
     this.emit(':responseReady');
    }
    else if((gbhosteltypevalue == "paari") || (gbhosteltypevalue == "g"))
    {
     this.response.speak(gbhosteltypevalue + " was one of the seven patron kings who were well known for philanthropy. One day as Pari was travelling through a forest on his golden chariot; wanted to quench his thirst and stopped near a stream. When he returned he found that a mullai plant (a wild jasmine creeper) had entwined itself around one of the wheels of the chariot. To move the chariot would mean to break its tendril. Sometimes it just a spark that brings on enlightenment and to Pari it came at that moment. Hence, he gave his golden chariot to the plant, and he walked back to his palace. Henceforth he gave away all his wealth. Tamils are well known for their hospitality. Pari's gesture to an ordinary Jasmine plant is a nice example");
     this.emit(':responseReady');
    }
    else if((gbhosteltypevalue == "oori") || (gbhosteltypevalue == "i"))
    {
     this.response.speak(gbhosteltypevalue + " block is named after a man of courage. He is a man with good character deriving from deep-rooted godliness. The value of a man is not his financial equities but it is his character. A man of valor teaches others by demonstration what magnanimity is like. Oori known for his valor was said to have killed a lion, bear, deer and a boar with a single arrow. Inspired by his defiance, the hostel was named after the great philanthropist, Valvil Oori. It was constructed in the year 2008 and can house a maximum of 930 students.");
     this.emit(':responseReady');
    }
    else if((gbhosteltypevalue == "kaari") || (gbhosteltypevalue == "h"))
    {
     this.response.speak(gbhosteltypevalue + " was considered the most modest of kings and is well known for his philanthropy. It is being said that nobody left empty-handed after visiting him. The visitor who came on barefoot would usually return vaulted on a horse or an elephant of his choice. He called himself not a king but a rightful servant of his beloved people. Impressed with his credentials we named the hostel, Kaari to inspire the students of his benevolence.");
     this.emit(':responseReady');
    }
    else if((gbhosteltypevalue == "adhiyaman") || (gbhosteltypevalue == "j"))
    {
     this.response.speak(gbhosteltypevalue + " known for his generosity in Tamil literature is said to have donated a rare gooseberry, with the characteristic feature of giving long life to the great poet Avvaiyar to promote literature. We accolade the gesture of the King and have a hostel campus after his name");
     this.emit(':responseReady');
    }
    else if((gbhosteltypevalue == "t.r.s") || (gbhosteltypevalue == "t r s")) 
    {
     this.response.speak(gbhosteltypevalue + " hostel at SRM gives each individual ample opportunity to develop one's personality by developing important qualities like self-confidence, free exchange of ideas, and mutual understanding.").listen();
     this.emit(':responseReady');
    }
    else if((gbhosteltypevalue == "pf") || (gbhosteltypevalue == "pierre fauchard")) 
    {
     this.response.speak(gbhosteltypevalue + " hostel is primarily for 2nd year students and is located close to Tech Park building. It consists of 15 floors and 30 rooms in each fllor. This high rise building provides a breathtaking view of the campus and the lake behind.");
     this.emit(':responseReady');
    }
    }
};

exports.handler = function (event,context,callback){
const alexa=Alexa.handler(event,context);
alexa.registerHandlers(handlers);
alexa.APP_ID='amzn1.ask.skill.fe216b43-b4fd-4f56-9ddb-ba72e275da93';
alexa.execute();
}