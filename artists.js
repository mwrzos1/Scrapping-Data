var request = require('request');
var cheerio = require('cheerio');
var nodeMailer = require('nodemailer');

request('https://www.billboard.com/charts/rap-song',function(error, response,html){
	if(!error){

    var displayOne = "";
    var displayMore = "";

    var $ = cheerio.load(html);

if (process.argv.length <= 2)
{
	console.log("You did not choose any specific artist");
}
	else
    {
      $('div.chart-row__title').each(function(i, element){
    	
	       var i = 2;
  	       while(i < process.argv.length){

	 	     if ($(element).children('a.chart-row__artist').text().match(process.argv[i]) 
	 	     || $(element).children('span.chart-row__artist').text().match(process.argv[i])){
	 
	           var oneArtist  = $(element).children('a.chart-row__artist')
	           var manyArtists = $(element).children('span.chart-row__artist')
	           var titleOfSong = $(element).children('h2.chart-row__song')
               } 
	         i++
           }
               $(oneArtist).each(function(i, element){
               	 displayOne = displayOne.concat("<p><b>"+$(element).text().trim()+
               	  " </b> "+" : "+" <i> "+ $(titleOfSong).text().trim()+"</i></p>");
               });

               $(manyArtists).each(function(i, element){
	             displayMore = displayMore.concat("<p><b>"+$(element).text().trim()+
	              " </b> "+" : "+" <i> "+ $(titleOfSong).text().trim()+"</i></p>");
                });
      });
	


     if (process.argv.length - 3 > 0){
				var i = 2;
				while(i < process.argv.length)
				{
					if (i < process.argv.length - 1)
					{
						var moreThanOne = "";
						string1 = (process.argv[i]);
						string2 = (", ");
						moreThanOne = string1.concat(string2);
					}
					else 
					{
					    moreThanOne = moreThanOne.concat(process.argv[i]);
					}
				 i++
				}
				let mailOptions = {
					from: 'cosc484@gmail.com',
					to:   'masyn21@yahoo.com',
					subject: ('Your artists are: ' + moreThanOne),
					html: (displayOne.toString()+displayMore.toString())  
            
				};
				transporter.sendMail(mailOptions, function(error, info)
				{
					if (error) 
					{
					  console.log(error);
					} 
					else 
					{
					  console.log('Email sent: ' + info.response);
					}
				});
			}
			else
			{
				if(displayOne.trim().length > 0 || displayMore.trim().length > 0)
				{
					let mailOptions = {
						from: 'cosc484@gmail.com',
						to:   'masyn21@yahoo.com',
						subject: ('Your artist is: ' + process.argv[2]),
						html: (displayOne.toString()+displayMore.toString()) 
					};
					transporter.sendMail(mailOptions, function(error, info)
					{
						if (error) 
						{
						 console.log(error);
						} 
						else 
						{
						 console.log('Email sent: ' + info.response);
						}
					});
				}
			}	
		}			
	}
});

let transporter = nodeMailer.createTransport({
         host: 'smtp.gmail.com',
         port: 465,
         secure: true,
         auth: {
                user: 'cosc484@gmail.com',
                pass: 'cosc484!'
               }

});