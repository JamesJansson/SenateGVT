// Copyright James Jansson
// If you have been given this code, it is for your personal use only. You may not transfer it to any other individual without seeking permission of James Jansson. 

function BallotPaper(NumberOfVotes, TransferValue, CurrentPosition, PreferenceList){
	// A BallotPaper can represent either a single or multiple ballot papers with the smae preference instruction
	
	
	
	this.NumberOfVotes=NumberOfVotes;
	this.TransferValue=TransferValue;
	this.CurrentPosition=CurrentPosition;
	this.PreferenceList=PreferenceList;
}

BallotPaper.prototype.EffectiveVotes = function(){ 
	return this.NumberOfVotes*this.TransferValue;
}

BallotPaper.prototype.CurrentParty = function(){ 
	return this.PreferenceList[this.CurrentPosition];
}

BallotPaper.prototype.MultiplyTransferValue=function(ProportionToTransfer){
	this.TransferValue=this.TransferValue*ProportionToTransfer;
}

BallotPaper.prototype.SpawnNewBallotPaper = function( ArrayOfParties){ 
	
	// find the next party that has not been excluded 
	var NewPreferenceListPos=CurrentPosition;
	var PartyFound=false;
	while (PartyFound==false && NewPreferenceListPos<this.PreferenceList.length){
		NewPreferenceListPos++;
		if (ArrayOfParties[NewPreferenceListPos].CurrentlyEliminated==false){
			// Add the 
			PartyFound=true;
		}
	}
	if (PartyFound){
		var NewBallotPaper= new BallotPaper(this.NumberOfVotes, this.TransferValue, NewPreferenceListPos, this.PreferenceList);
		return NewBallotPaper;
	}
	
	return NaN;// else the votes simply expire
}




function PolitcialParty(ID, Name, PrimaryVote, PointerToThePartyArray){
	this.ID=ID;// party abbreviation
	this.Name=Name;// Long name
	this.PrimaryVote=PrimaryVote;
	this.PartyArray=PointerToThePartyArray;
		
	this.GVT=[];// list of parties (numbers)

	this.BallotPaperArray=[];// an array of ballots that the party accumulates
	
	this.CurrentlyEliminated=false;
	this.Elected=0;
	
	this.FriendlyGroup;
}

PolitcialParty.prototype.AddGVT = function(GVT){ 
	this.GVT.push=GVT;// there can be up to 3 GVTs per group.
}

PolitcialParty.prototype.CreateOwnBallots = function(){ 
	var NumberOfGVTs=this.GVT.length;
	var PerGVTTransferValue=1/NumberOfGVTs;
	for (var GVTCount in this.GVT){
		var CurrentPosition=0;//self
		var OwnGVT=new BallotPaper(this.PrimaryVote, PerGVTTransferValue, CurrentPosition, this.GVT[GVTCount]);
		this.BallotPaperArray.push(OwnGVT);
	}
}

PoliticalParty.prototype.TotalEffectiveVotes=function(){
	var TotalVotes=0;
	// go through the list of their own ballots
	for (var BallotCount in this.BallotPapers){
		TotalVotes+=this.BallotPapers[BallotCount].EffectiveVotes();
	}
	return TotalVotes;
}



PoliticalParty.Prototype.SetFriendlyGroup = function(GroupID){ 
	this.GroupID=GroupID;
}

PolitcialParty.prototype.Elect = function(ProportionNeededToElect){
	this.Elected++;
	var ProportionToTransferToSelf=1-ProportionNeededToElect;
	for (var BallotPaperCount in this.BallotPaperArray){
		this.BallotPaperArray.MultiplyTransferValue(ProportionToTransferToSelf);
	}
}

PolitcialParty.prototype.Eliminate = function(){ // called when at the bottom of hte list of parties
	this.CurrentlyEliminated=true;
	
	this.TransferPreferences();
}




PolitcialParty.prototype.TransferPreferences = function(){
	// go through all the ballot papers that this individual has accumulated
	for (var BallotCount in this.BallotPaperArray){
	
		var NewBallotPaper=this.BallotPaperArray[BallotCount].SpawnNewBallotPaper(this.PartyArray);
		if (isNaN(NewBallotPaper)==false){// if a BallotPaper is spawned
			// Determine which party is is supposed to go to
			var PartyRef=NewBallotPaper.CurrentParty();
			
			this.PartyArray[PartyRef].AddBallotPaper(NewBallotPaper);
		}
	}


	// go down the list, seeing if the party is currently eliminated
	
	//while?
	for (var P in this.PreferenceList){
		var PartyID=this.PreferenceList[P];
		if (this.PartyArray[PartyID].CurrentlyEliminated==true){
			
		}
	}
}


function ProcessPreferences(){

	// Sort
	// Find quotas
	// Eliminate lowest count

}

function Election(NumSenatorsForElection){
	this.PartyArray=[];// an array of parties stored by reference to their acronym e.g. this.PartyArray['FP'], this.PartyArray['LIB']
	this.VotingData;
	this.TotalVotes;
	this.SenatorsForElection=NumSenatorsForElection;
	this.Quota;
	
	this.ElectionResult;
}


Election.proto.CreateParties=function(IDArray, NameArray, PrimaryVoteArray){
	// add party to party array
	this.PartyArray=[];
	
	this.TotalVotes=0;
	
	for (var PCount in IDArray){
		var ID=IDArray[PCount];
		var Name=NameArray[PCount];
		var PrimaryVote=PrimaryVoteArray[PCount];
		
		var a=new PolitcialParty(ID, Name, PrimaryVote, this.PartyArray);
		
		// Store the party under its ID		
		this.PartyArray[ID]=a;
		
		// Sum up the total votes
		this.TotalVotes+=PrimaryVote;
	}
	
	this.Quota=Math.ceil(this.TotalVotes/(this.SenatorsForElection+1))
}

Election.proto.RunElection =function(){
	this.ElectionResult={};
	this.ElectionResult.ElectedParties=[];
	
	var SenatorsElected=0;
	while (SenatorsElected<this.SenatorsForElection){
		// Try to elect someone
		var PartiesNotEliminated=[];
		for (var PartyID in this.PartyArray){
			var CurrentParty=this.PartyArray[PartyID]; 
			if (CurrentParty.CurrentlyEliminated==false){
				PartiesNotEliminated.push(CurrentParty);
			}
		}
		
		// Find the party with max and min votes
		var TopVotes=0;
		var TopParty;
		var BottomVotes=1e20;
		var BottomParty;
		for (var PartyCount in PartiesNotEliminated){
			var CurrentParty=PartiesNotEliminated[PartyCount];
			CurrentPartyVotes=CurrentParty.TotalEffectiveVotes();
			if (CurrentPartyVotes>TopVotes){
				TopVotes=CurrentPartyVotes;
				TopParty=CurrentParty;
			}
			if (CurrentPartyVotes<BottomVotes){
				BottomVotes=CurrentPartyVotes;
				BottomParty=CurrentParty;
			}
		}
		
		
		// if the top one has enough for a quota
		if (TopVotes>=this.Quota){
			SenatorsElected++;
			var ProportionNeededToElect=TopVotes/this.Quota;
			TopParty.Elect(ProportionNeededToElect);// Elect the person
			this.ElectionResult.ElectedParties.push(TopParty.ID);
		}
		else if (PartiesNotEliminated.length<=2){// If there are only two parties that remain
			PartiesNotEliminated[0]
			
			// if (false) {/////////////////////
			// 	// find the biggest player
			// 	var 
				
				
			// 	Top.Elect;
			// 	SenatorsElected++;
			// }
			
		//
		}
		else{// eliminate the lowest count in the list of those not eliminated
			
			MinParty.Eliminate();
			
			this.Party
		}
	}
}


function ExampleSimulation(){
	var NumberOfElections=100;
	var NumberOfParties=4;
	
	var IDArray=['AA', 'BB', 'CC', 'DD'];
	var NameArray=['Ayes', 'Bees', 'Seas', 'Deez'];
	
	var PrimaryVoteArray=[Math.floor(10000*Math.random()), Math.floor(10000*Math.random()), Math.floor(10000*Math.random()), Math.floor(10000*Math.random())];
	
	var GVT=[];
	GVT['AA']=['AA', 'CC', 'DD', 'BB'];
	GVT['BB']=['BB', 'DD', 'CC', 'AA'];
	GVT['CC']=['CC', 'AA', 'DD', 'BB'];
	GVT['DD']=['DD', 'DD', 'DD', 'BB'];
	
	var DemoElection=new Election(6);
	
	DemoElection.CreateParties(IDArray, NameArray, PrimaryVoteArray);
	
	for (var ID in GVT){
		DemoElection.PartyArray[ID].AddGVT(GVT[ID]);
	}
	
	console.log("Demo Election");
	console.log(DemoElection);
	
	DemoElection.RunElection();
}








function DealPreferences(){
	// Each party swaps similar positions in the preferences
	for (var Pos=2; Pos<PartyArray.length; Pos++){
		if (LeftGroup==true){
			if (PositionsInLeftGroupRemain){
				//find parties that have not yet traded with
				
				if (RogueGroup){// not used derogatory, more to mean going your own way
				}
			}
		}
		if (Scenario==1){// randomly swap 
		}
		if (){// swap according to nearest vote level
		
		}
		if (Scenario==2){//swap from bottom up (smallest first for a single party)
		}
		if (Scenario==3){//two groups
		}
		if (){// two groups with levels that 
		}
	//
	}
}

Victoria.Party=[];
Victoria.Party[0]={};
Victoria.Party[0].Name='LNP';
Victoria.Party[1].PrimaryVote=2000000;

