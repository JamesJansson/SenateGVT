// Copyright James Jansson
// If you have been given this code, it is for your personal use only. You may not transfer it to any other individual without seeking permission of James Jansson. 

function BallotPaper(NumberOfVotes, TransferValue, CurrentPosition, GVT){
	this.NumberOfVotes=NumberOfVotes;
	this.TransferValue=TransferValue;
	this.CurrentPosition=CurrentPosition;
	this.GVT=GVT;
}

BallotPaper.prototype.EffectiveVotes = function(){ 
	return this.NumberOfVotes*this.TransferValue;
}

BallotPaper.prototype.CurrentParty = function(){ 
	return this.GVT[CurrentPosition];
}


BallotPaper.prototype.SpawnNewBallotPaper = function(ProportionToTransfer, ArrayOfParties){ 
	var NewTransferValue=this.TransferValue*ProportionToTransfer;
	
	// find the next party that has not been excluded 
	var Count=CurrentPosition;
	var PartyFound=false;
	while (PartyFound==false && Count<this.GVT.length){
		Count++;
		if (ArrayOfParties[Count].CurrentlyEliminated==false){
			// Add the 
			PartyFound=true;
		}
	}
	if (PartyFound){
		var NewBallotPaper= new BallotPaper(this.NumberOfVotes, NewTransferValue, Count, this.GVT);
		return NewBallotPaper;
	}
	
	return NaN;// else the votes simply expire
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

PolitcialParty.prototype.Eliminate = function(){ // called when at the bottom of hte list of parties
	this.CurrentlyEliminated=true;
	
	this.TransferPreferences();
}




PolitcialParty.prototype.TransferPreferences = function(){
	// go through all the ballot papers that this individual has accumulated
	for (var BallotCount in this.BallotPaperArray){
	
		var NewBallotPaper=this.BallotPaperArray.SpawnNewBallotPaper();
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
	this.SenatorsForElection=SenatorsForElection;
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
	var SenatorsElected=0;
	var PartiesElectedArray=[];
	while (SenatorsElected<this.SenatorsForElection){
		// Try to elect someone
		var PartiesNotEliminated=[];
		for (var PartyID in this.PartyArray){
			var CurrentParty=this.PartyArray[PartyID]; 
			if (CurrentParty.CurrentlyEliminated==false){
				PartiesNotEliminated.push(CurrentParty);
			}
		}
		
		
		// Find the max party with votes
		var TopVotes=0;
		for (var PartyID in this.PartyArray){
			var CurrentParty=this.PartyArray[PartyID];
			if (CurrentParty.CurrentlyEliminated==false){
				
			}
		}
		// if the top one has enough for a quota
			SenatorsElected++;
			// Elect the person
		
		// 
		
		else if (PartiesNotEliminated.length<=2){// If there are only two parties that remain
			
			
			if {
				// find the biggest player
				var 
				
				
				Top.Elect;
				SenatorsElected++;
			}
			
		//
		}
		else{// eliminate the lowest count in the list of those not eliminated
			
			MinParty.Eliminate();
			
			this.Party
		}
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

