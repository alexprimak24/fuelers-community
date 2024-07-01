contract;

use std::{auth::msg_sender, hash::Hash, primitive_conversions::u64::*, storage::storage_vec::*,};

abi FuelersCommunity {
    //initialize categories - if it is not exist 3StorageMaps will have 5 fields of value 0
    #[storage(read, write)]
    fn initialize_categories();
    //get current state of contibutor votes
    #[storage(read)]
    fn read_contributor() -> Vec<u8>;
    #[storage(read)]
    //get current state of contribution votes
    fn read_contribution() -> Vec<u8>;
    //get current state of activist votes
    #[storage(read)]
    fn read_activist() -> Vec<u8>;
    //submit user vote
    #[storage(read, write)]
    fn submit_vote(category: u8, user_vote: u8);
    // set the contract owner
    #[storage(read, write)]
    fn initialize_owner() -> Identity;
}

enum InvalidError {
    OnlyOwner: Identity,
    AlreadyVoted: Identity,
}

storage {
    //3 categories to vote for
    //best_contributor: StorageMap<u64 - option number (the person to vote for), u64 - amount of votes for that candidate> = StorageMap {},
    best_contributor: StorageMap<u8, u8> = StorageMap {},
    best_contribution: StorageMap<u8, u8> = StorageMap {},
    best_activist: StorageMap<u8, u8> = StorageMap {},
    //3 Maps to check whether user voted or not
    has_voted_for_contributor: StorageMap<Identity, bool> = StorageMap {},
    has_voted_for_contribution: StorageMap<Identity, bool> = StorageMap {},
    has_voted_for_activist: StorageMap<Identity, bool> = StorageMap {},
    // owner of the contract
    owner: Option<Identity> = Option::None,
}

impl FuelersCommunity for Contract {
    #[storage(read, write)]
    fn initialize_categories() {
        let owner = storage.owner.try_read().unwrap();

        // make sure the owner has been initialized
        require(owner.is_some(), "owner not initialized");

        let sender = msg_sender().unwrap();
        // require the sender to be the owner
        require(sender == owner.unwrap(), InvalidError::OnlyOwner(sender));
        // Initialize or clear categories
        let mut counter: u8 = 0;
        while counter < 5 {
            storage.best_contributor.insert(counter, 0);
            storage.best_contribution.insert(counter, 0);
            storage.best_activist.insert(counter, 0);
            counter += 1;
        }
        //now I have best_contributor: StorageMap<u64, u64> = StorageMap {}:
        // 1 - 0
        // 2 - 0
        // 3 - 0
        // 4 - 0
        // 5 - 0
    }
    #[storage(read, write)]
    fn submit_vote(category: u8, user_vote: u8) {
        require(category < 3, "there is no such category");
        require(user_vote < 5, "there is no such option to vote");
        let sender = msg_sender().unwrap();
        if (category == 0) {
            let voter = storage.has_voted_for_contributor.get(sender).try_read().unwrap_or(false);
            // Check if the user has already voted for that category
            require(voter == false, InvalidError::AlreadyVoted(sender));
            // Read All the Votes
            let current_votes = storage.best_contributor.get(user_vote).try_read().unwrap_or(0);
            // Incert user vote
            storage
                .best_contributor
                .insert(user_vote, current_votes + 1);
            // Set that user has voted
            storage.has_voted_for_contributor.insert(sender, true);
        } else if (category == 1) {
            let voter = storage.has_voted_for_contribution.get(sender).try_read().unwrap_or(false);
            // Check if the user has already voted for that category
            require(voter == false, InvalidError::AlreadyVoted(sender));
            // Read All the Votes
            let current_votes = storage.best_contribution.get(user_vote).try_read().unwrap_or(0);
            // Incert user vote
            storage
                .best_contribution
                .insert(user_vote, current_votes + 1);
            // Set that user has voted
            storage.has_voted_for_contribution.insert(sender, true);
        } else if (category == 2) {
            let voter = storage.has_voted_for_activist.get(sender).try_read().unwrap_or(false);
            // Check if the user has already voted for that category
            require(voter == false, InvalidError::AlreadyVoted(sender));
            // Read All the Votes
            let current_votes = storage.best_activist.get(user_vote).try_read().unwrap_or(0);
            // Incert user vote
            storage.best_activist.insert(user_vote, current_votes + 1);
            // Set that user has voted
            storage.has_voted_for_activist.insert(sender, true);
        }
    }

    #[storage(read)]
    fn read_contributor() -> Vec<u8> {
        //create an empty vector
        let mut contributor_vec: Vec<u8> = Vec::new();
        let mut counter: u8 = 0;
        while counter < 5 {
            //push values to that vectore from StorageMap
            contributor_vec.push(storage.best_contributor.get(counter).try_read().unwrap_or(10));
            counter += 1;
        }
        //output that vector
        contributor_vec
    }
    #[storage(read)]
    fn read_contribution() -> Vec<u8> {
        //create an empty vector
        let mut contribution_vec: Vec<u8> = Vec::new();
        let mut counter: u8 = 0;
        while counter < 5 {
            //push values to that vectore from StorageMap
            contribution_vec.push(storage.best_contribution.get(counter).try_read().unwrap_or(10));
            counter += 1;
        }
        //output that vector
        contribution_vec
    }
    #[storage(read)]
    fn read_activist() -> Vec<u8> {
        //create an empty vector
        let mut activist_vec: Vec<u8> = Vec::new();
        let mut counter: u8 = 0;
        while counter < 5 {
            //push values to that vectore from StorageMap
            activist_vec.push(storage.best_activist.get(counter).try_read().unwrap_or(10));
            counter += 1;
        }
        //output that vector
        activist_vec
    }
    #[storage(read, write)]
    fn initialize_owner() -> Identity {
        let owner = storage.owner.try_read().unwrap();

        // make sure the owner has NOT already been initialized
        require(owner.is_none(), "owner already initialized");

        // get the identity of the sender        
        let sender = msg_sender().unwrap();
        // set the owner to the sender's identity
        storage.owner.write(Option::Some(sender));

        // return the owner
        sender
    }
}
