// Detect platform to show appropriate download links.
document.addEventListener("DOMContentLoaded", function() {

	var os = platform.os.family;
	
	if (os == "Windows" || os == "Windows Server" || os == "Windows 7" || os == "Windows 7 / Server 2008 R2" || os == "Windows Server 2008 R2 / 7 x64") {
		elements = document.getElementsByClassName("windl");
		for (i = 0; i < elements.length; i++) {
			elements[i].style.display = "block";
		}
		elements = document.getElementsByClassName("alldl");
		for (i = 0; i < elements.length; i++) {
			elements[i].style.display = "none";
		}
	}

	if (os == "CentOS" || os == "Debian" || os == "Fedora" || os == "Gentoo" || os == "Kubuntu" || os == "Linux Mint" || os == "Red Hat" || os == "SuSE" || os == "Ubuntu" || os == "Ubuntu Chromium" || os == "Xubuntu" || os == "Linux") {
		elements = document.getElementsByClassName("linuxdl");
		for (i = 0; i < elements.length; i++) {
			elements[i].style.display = "block";
		}
		elements = document.getElementsByClassName("alldl");
		for (i = 0; i < elements.length; i++) {
			elements[i].style.display = "none";
		}
	}

	if (os == "OS X") {
		// If we detect OS X, we can't know if the user will want an amd or arm
		// build. Just show the amd link which will work on both platforms.
		elements = document.getElementsByClassName("macdl");
		for (i = 0; i < elements.length; i++) {
			elements[i].style.display = "block";
		}
		elements = document.getElementsByClassName("alldl");
		for (i = 0; i < elements.length; i++) {
			elements[i].style.display = "none";
		}
	}
});

$(document).ready(function () {
	// var API = 'https://api.decred.org/?c=info';
	var API = 'http://localhost:8080/api?c=info';
	
	$.ajax({
		url: API,
		dataType: "json",
		error:  drawStatsError,
		success: drawStats,
	});
});

var drawStats = function(data) {
	
	// Circulating Supply.

	var circulating = Math.round(data.circulatingsupply/100000000000000);
	$('[data-stat-name="circulating-supply"]').each(function(){
		this.innerHTML = circulating + "Mil";
	});

	// Total coins mined.

	var mined = Math.round(100 * (data.circulatingsupply / data.supplyultimate));
	mined = Math.round(mined);
	$('[data-stat-name="coins-mined"]').each(function(){
		this.innerHTML = mined + "%";
	});
	
	// Emission per year.
	
	var blockReward = data.blockreward;
	const blocksPerYear = 105120;
	var annualReward = blockReward * blocksPerYear;
	var emission = Math.round(100 * (annualReward / data.circulatingsupply));
	$('[data-stat-name="coins-emission"]').each(function(){
		this.innerHTML = emission + "%/YEAR";
	});

	// Percentage staked.

	var staked = data.staked;
	staked = Math.round(staked / (data.circulatingsupply/10000000000));
	$('[data-stat-name="total-staked"]').each(function(){
		this.innerHTML = staked + "%";
	});

	// Treasury balance.

	var treasury = Math.round(data.treasury/100000000000000);
	$('[data-stat-name="treasury"]').each(function(){
		this.innerHTML = treasury + "Mil";
	});

	// Stake reward per year.
	var voteReward = data.blockreward / 100 * 89 / 5 / 100000000;

	var voteRewardDecimal = voteReward / data.ticketprice;

	var x = 1 + voteRewardDecimal;
	var y = 365 / 29.07;
	var annualRewardPercent = Math.round((Math.pow(x,y) - 1) * 100);
	$('[data-stat-name="stake-reward"]').each(function(){
		this.innerHTML = annualRewardPercent + "%APY";
	});

	// Block reward reduction in X days.

	var days = data.daysuntilrewardchange;
	$('[data-stat-name="reward-reduction-days"]').each(function(){
		this.innerHTML = days + "DAYS";
	});
}

var drawStatsError = function(jqXHR) {
	alert(error);
	// var errorMarkup = '<div class="ui-widget"><div class="ui-state-error ui-corner-all">' +
	// 	'<p><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>' +
	// 	'<strong>Error:</strong> ' + jqXHR.status + '</p></div></div>';
	// $("#vspd-data").html(errorMarkup);
};

var consolestyle = [
	'background: linear-gradient(to right, #2970ff, #2ED6A1);',
	'color: #091440',
	'font-family: monospace',
	].join(';');
  
console.log(`%c
Stakey needs you! for a bug squishin' mission https://docs.decred.org/contributing/overview/
┌ᴗᴗᴗᴗᴗᴗ┐╭  ╮┌ᴗᴗᴗᴗᴗᴗ┐╭  ╮┌ᴗᴗᴗᴗᴗᴗ┐    ┌ᴗᴗᴗᴗᴗᴗ┐╭    ┌ᴗᴗᴗᴗᴗᴗ┐╭  ╮┌ᴗᴗᴗᴗᴗᴗ┐╭  ╮┌ᴗᴗᴗᴗᴗᴗ┐    ┌ᴗᴗᴗᴗᴗᴗ┐╭ 
╭╣● ▄  ●╠╯  ╰╣●    ●╠╯  ╰╣●   ● ╠╮  ╭╣● ▄▄ ●╠╯   ╭╣● ▄▄ ●╠╯  ╰╣●    ●╠╯  ╰╣●   ● ╠╮  ╭╣●  ▄ ●╠╯ 
╯║      ║    ║   ▄  ║    ║  ▄▄  ║╰  ╯║      ║    ╯║      ║    ║  ▄▄  ║    ║  ▄   ║╰  ╯║      ║  
╚─┬──┬─╝    ╚─┬──┬─╝    ╚─┬──┬─╝    ╚─┬──┬─╝     ╚─┬──┬─╝    ╚─┬──┬─╝    ╚─┬──┬─╝    ╚─┬──┬─╝  
	┙  ┕        ┕  ┙        ┙  ┙        ┙  ┕         ┙  ┙        ┕  ┕        ┕  ┙        ┙  ┕    `
, consolestyle);
