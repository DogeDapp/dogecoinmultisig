$(document).ready(function() {
/******************************************************************
* 20190816 tcc
******************************************************************/
//window.alert("Hello from the initialization portion of payspot.js. ");
var tx = coinjs.transaction();
var tempstring;
var work;
var work_address;
var work_balance;
var work_unconfirmed_balance;
var work_redeem_script;

//$("#tsNewScreen01"   	).toggle("fast","swing");	// hide this at initialization time
$("#psNewScreen01"  	).toggle("fast","swing");	// hide this at initialization time
$("#psNewScreen02"  	).toggle("fast","swing");	// hide this at initialization time This is the for Mini Invoice  for the user to populate.
$("#psNewScreen03"  	).toggle("fast","swing");	// hide this at initialization time This is the for SoDogeTip interface (amount)

/* user presses the Spend button, this opens up the Spend Dialog Box */ 
/*$("#psTogBtn1").click(function(){       // SPEND
        $("#psPayBox").toggle();
});
*/

/* user clicks on the 'Quick Instructions' */
$("#psQuickInstructions").click(function(){
        $("#psNewScreen01").toggle();
});


var _getVerify = _get("payspot");
if(_getVerify[0]){
var tt0 = _getVerify[0];

        console.info("total length = " + _getVerify[0].length);  // 172 = 130 + 42
        console.info("_getVerify[0] = " + _getVerify[0]);
                    work_address = tt0.slice(0);         // the address

               $("#psAddress").val(work_address);

	makePaySpot();		

    setTimeout(function () {
//        if (address) {
//                $("#walletRefresh").click();
//        }
    }, 2000);

}


function _get(value) {
        var dataArray = (document.location.search).match(/(([a-z0-9\_\[\]]+\=[a-z0-9\_\.\%\@]+))/gi);
        var r = [];
        if(dataArray) {
                for(var x in dataArray) {
                        if((dataArray[x]) && typeof(dataArray[x])=='string') {
                                if((dataArray[x].split('=')[0].toLowerCase()).replace(/\[\]$/ig,'') == value.toLowerCase()) {
                                        r.push(unescape(dataArray[x].split('=')[1]));
                                }
                        }
                }
        }
        return r;
}

/* user clicks on Verify */
/*$("#tsVerifyBtn").click(function(){
        var v1  = document.getElementById("tsRedeemScript").value;
        var redeem_script = v1.trim();
	var tt0 = document.location.origin+''+document.location.pathname+'?verify='+redeem_script+'#verify';
	window.open(tt0);
});*/

/* user clicks on Reddit (search) Link */
$("#psRedditBtn").click(function(){
var v1  = document.getElementById("psAddress").value;
console.info("v1 = " + v1);
	var tt0 = 'https://www.reddit.com/search?q=%22' + v1 + '%22&sort=new' ;
	window.open(tt0);
});

/* user clicks on Reddit xxxgetipbot loading Link */
/* user clicks on Reddit sodogetip loading Link */
$("#psRedditLoadBtn").click(function(){
var v1  = document.getElementById("psAddress").value;
var v2  = document.getElementById("psSoDogeTipAmt").value;
//var tt0 = 'https://www.reddit.com/message/compose?to=sodogetip&subject=withdraw&message=%2Bwithdraw%20' + v1 + '%20ReplaceMeWithAmount%20doge verify';
var tt0 = 'https://www.reddit.com/message/compose?to=sodogetip&subject=%2Bwithdraw&message=%2Bwithdraw%20' + v2 + '%20doge%20to%20' + v1;
	window.open(tt0)
});

/* user clicks on "SoDogeTip" button to open the interface */
$("#psSoDogeTipBtn").click(function(){
var v1  = document.getElementById("psAddress").value;
	console.info("You've clicked on the SoDogeTip Button!");
        $("#psNewScreen03").toggle();
});

/* user clicks on "Create Micro Invoice" Button */
$("#psMicroInvoiceBtn").click(function(){
var v1  = document.getElementById("psAddress").value;
	console.info("You've clicked on the Micro Invoice Button!");
        $("#psNewScreen02").toggle();
	alert("This part is UNDER CONSTRUCTION! Sorry. Come back later!");
});

/* user clicks on "Next" Button on the Create Mini Invoice Screen */
$("#psMicroInvoiceNextBtn").click(function(){
//var v1  = document.getElementById("psMI01").value;	// info
var v2  = document.getElementById("psMI02").value;	// amount
//var v3  = document.getElementById("psMI03").value;	// contact
//var v4  = document.getElementById("psMI04").value;	// photo (IMGUR code)
console.info("******************************************************************");
console.info("* MICRO INVOICE CREATION!");
console.info("******************************************************************");
//console.info("Provided Info              = \n" + v1);
console.info("Address to Pay To = \n" + work_address);
console.info("Amount            = \n" + v2);
//console.info("Contact Info      = \n" + v3);
//console.info("IMGUR code        = \n" + v4);
console.info("******************************************************************");
var tt0 = document.location.origin+''+document.location.pathname+'?microinvoice=' + work_address + '#microinvoice';
window.open(tt0);
});

/* user clicks on Next for generating the multisig */
/*$("#newtsMultiSigAddress").click(function(){
	$("#tsmultisigPubKeys").addClass("hidden");
	makeTripleShibe();		// it'll have sorting 
});*/

/*************************************************
**************************************************/
function makePaySpot() {
//var ps_address = document.getElementById("tsAddress").value;
var keys = [];


        if (work_address.length == 34) {
                console.info("A single address and this is correct.");
 //               keys.push(ps_address);
                $("#psAddress").val(work_address);
	} else {
		var tt1 = "ERROR: Address is not the expected size." + 
			"Length: "   + work_address.length +  " (expected: 34)" ;
		$("#psmultisigPubKeys").removeClass("hidden");
		console.error(tt1);
		alert(tt1);
		return false;
	}

//	$("#psmultiSigData").removeClass("hidden");			// HAPPY PATH!
//	$("#tsmultisigPubKeysAfter").removeClass("hidden");			// HAPPY PATH! but keep it hidden because we need it in the back.
/*	$("#tsPubKeyAfter1").val(bs_pubKey1);		// these 3 display the readonly pubkeys..
	$("#tsPubKeyAfter2").val(bs_pubKey2);	
	$("#tsPubKeyAfter3").val(bs_pubKey3);		
*/

        /***************************************
	* Create the multisig, redeem etc here:
        ****************************************/
/*
        var multisig =  coinjs.pubkeys2MultisigAddress(keys, 2);
                        $("#tsAddress").val(multisig['address']);
                        $("#tsRedeemScript").val(multisig['redeemScript']);
                        $("#tsRedeemScriptURL").val(document.location.origin+''+document.location.pathname+'?verify='+multisig['redeemScript']+'#verify');
*/

	/* here's the URL for this page. */
	$("#psPageURL").val(document.location.origin+''+document.location.pathname+  '?payspot='+work_address+'#payspot');
	
	/*****************************************
	* Get and display the balance(s)
	*****************************************/
	setTimeout(function () {
		payspot_wallet_balance(work_address,"psBalance","psUCBalance");
	}, 750);
}



/* user clicks on the 'Quick Instructions' */
/*
$("#psQuickInstructions").click(function(){
        $("#tsNewScreen01").toggle();
});
*/

/* copy address */
var copyTextareaBtn1 = document.querySelector('.js-pstextareacopybtn1');
copyTextareaBtn1.addEventListener('click', function(event) {
  var copyTextarea = document.querySelector('.js-pscopytextarea1');
  copyTextarea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }
});

/* copy URL */
var copyTextareaBtn2 = document.querySelector('.js-pstextareacopybtn2');
copyTextareaBtn2.addEventListener('click', function(event) {
  var copyTextarea = document.querySelector('.js-pscopytextarea2');
  copyTextarea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }

});


/* get from chain.so, then wait before displaying */
/* tempola TCC20161011- get back and fix this whle function */
/*
function payspot_wallet_balance(multisig, urlName, UCurlName) {
var tt1;
var tt2;
console.info("payspot_wallet_balance. Input Address: " + multisig);
	$.ajax ({
		type: "GET",
		url: "https://chain.so/api/v2/get_address_balance/DOGE/" + multisig,
		dataType: "json",
		error: function(data) {
			tt1 = JSON.stringify(data, null, 4);
			console.error("payspot_wallet_balance fail: %s",tt1);
		},
		success: function(data) {
			tt1 = JSON.stringify(data, null, 4);
			work_balance = data.data.confirmed_balance;
			work_unconfirmed_balance = data.data.unconfirmed_balance;
			console.info("payspot_wallet_balance: " + tt1);
		},
		complete: function(data, status) {
			var tempvar = "Unconfirmed Balance: " + work_unconfirmed_balance; // now set unconfirmed if non-0
			if (parseFloat(work_unconfirmed_balance) > parseFloat("0.00000000") ||
			    parseFloat(work_unconfirmed_balance) < parseFloat("0.00000000")) {
				if (parseFloat(work_unconfirmed_balance) > parseFloat("0.00000000")) {
					var tt1 = "Confirmed Balance: " + parseFloat(work_balance);
				} else {
					var tt1 = "Confirmed Balance: " + parseFloat((parseFloat(work_balance) +
									parseFloat(work_unconfirmed_balance)));
				}
				document.getElementById(urlName).innerHTML = tt1;    // display to HTML
				document.getElementById(UCurlName).innerHTML = tempvar; // display to HTML
				//$("#getWalletUCBalance").removeClass("hidden");
				$(UCurlName).removeClass("hidden");
			} else {
				var tt1 = "Confirmed Balance: " + parseFloat(work_balance);
				document.getElementById(urlName).innerHTML = tt1;    // display to HTML
			}
		}
	});
return true;
}
*/

/* 20190816 use blockcypher.io */
function payspot_wallet_balance(multisig, urlName, UCurlName) {
	console.info("20190816 update use blockcypher now");
	url_text = "https://api.blockcypher.com/v1/doge/main/addrs/" + multisig + "/balance";
	console.info("url_text = " + url_text);
	$.ajax ({
		type: "GET",
		url: url_text,
		dataType: "json",
		error: function(data) {
			tt1 = JSON.stringify(data, null, 4);
			console.error("payspot_wallet_balance fail: %s",tt1);
		},
		success: function(data) {
			var tt1 = JSON.stringify(data, null, 4);
			console.info("payspot_wallet_balance: " + tt1);
			work_balance = data.balance/100000000;
			work_unconfirmed_balance = data.unconfirmed_balance/100000000;
		},
		complete: function(data, status) {
			var tempvar = "Unconfirmed Balance: " + work_unconfirmed_balance; // now set unconfirmed if non-0
			if (parseFloat(work_unconfirmed_balance) > parseFloat("0.00000000") ||
			    parseFloat(work_unconfirmed_balance) < parseFloat("0.00000000")) {
				if (parseFloat(work_unconfirmed_balance) > parseFloat("0.00000000")) {
					var tt1 = "Confirmed Balance: " + parseFloat(work_balance);
				} else {
					var tt1 = "Confirmed Balance: " + parseFloat((parseFloat(work_balance) +
									parseFloat(work_unconfirmed_balance)));
				}
				document.getElementById(urlName).innerHTML = tt1;    // display to HTML
				document.getElementById(UCurlName).innerHTML = tempvar; // display to HTML
				//$("#getWalletUCBalance").removeClass("hidden");
				$(UCurlName).removeClass("hidden");
			} else {
				var tt1 = "Confirmed Balance: " + parseFloat(work_balance);
				document.getElementById(urlName).innerHTML = tt1;    // display to HTML
			}
		}
	});
}

});   /* EOF */

