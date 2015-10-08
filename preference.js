// Copyright James Jansson
// If you have been given this code, it is for your personal use only. You may not transfer it to any other individual without seeking permission of James Jansson. 

function BallotPaper(NumberOfVotes, TransferValue, CurrentPosition, GVT){
	this.NumberOfVotes=NumberOfVotes;
	this.TransferValue=TransferValue;
	this.CurrentPosition=CurrentPosition;
	this.GVT=GVT;
}

BallotPaper.prototype.EffectiveVotes = function(){ 
	return this.NumberOfVotes=this.TransferValue;
}

BallotPaper.prototype.Party = function(){ 
	return this.NumberOfVotes=this.TransferValue;
}


BallotPaper.prototype.SpawnNewBallotPaper = function(ProportionToTransfer, ArrayOfParties){ 
	var NewTransferValue=this.TransferValue*ProportionToTransfer;
	
	// find the next party that has not been excluded 
	var Count=CurrentPosition;
	while ( && this.GVT.length){
		Count++;
		if (ArrayOfParties[Count].CurrentlyEliminated==false){
			
		}
	}
	var 
}




function PolitcialParty(Name, ID, PrimaryVote, PointerToThePartyArray){
	this.Name=Name;// Long name
	this.ID=ID;// party abbreviation
	this.PrimaryVote=PrimaryVote;
	this.PartyArray=PointerToThePartyArray;
		
	this.GVT=[];// list of parties (numbers)

	this.BallotPaperArray=[];// an array of ballots 
	
	this.CurrentlyEliminated=false;
	this.Elected=false;
	
	this.FriendlyGroup;
}

PolitcialParty.prototype.AddGVT = function(GVT){ 
	this.GVT.push=GVT;// there can be up to 3 GVTs per group.
}

PolitcialParty.prototype.AddGVTToOwnBallots = function(){ 
	var NumberOfGVTs=this.GVT.length;
	var PerGVTTransferValue=1/NumberOfGVTs;
	for (var GVTCount in this.GVT){
		var OwnGVT=new BallotPaper(this.PrimaryVote, PerGVTTransferValue, CurrentPosition, this.GVT[GVTCount]);
		this.BallotPaperArray.push(OwnGVT);
	}
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

PolitcialParty.prototype.Elminate = function(){ // called when at the bottom of hte list of parties
	this.CurrentlyEliminated=true;
	
	this.TransferPreferences();
}




PolitcialParty.prototype.TransferPreferences = function(){
	// go down the list, seeing if the party is currently eliminated
	
	//while?
	for (var P in this.PreferenceList){
		var PartyID=this.PreferenceList[P];
		if (this.PartyArray.PartyID.CurrentlyEliminated==true){
			
		}
	}
}


function ProcessPreferences(){

	// Sort
	// Find quotas
	// Eliminate lowest count

}

function Election(TotalVotes, SenatorsForElection, PartyDetails, PartyVotes, PartyGVTs){
	this.PartyArray=[];
	this.VotingData;
	this.TotalVotes=TotalVotes;
	this.Quota=Math.ceil(TotalVotes/(SenatorsForElection+1));
}


Election.proto.CreateParties=function(){
	PartyArray=[];
	// function add party to party array
	for (){
		var a=new PolitcialParty(Name, PrimaryVote, PartyArray);
	}
}

Election.proto.RunElection =function(){
	
	for (){
		// Try to elect someone
		// Sort all the parties by their primary
		
		// if the top one has enough for a quota
		
		// Elect the person
		
		// 
		
		
		// If there are only two parties that remain
		
		//
		
		
	}
	
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

