// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract VotingContract {
    struct Proposal {
        address creator;
        string title;
        string description;
        string nounSeed; // Seed for generating Noun image
        string[] options;
        uint256[] votes;
        bool exists;
    }

    uint256 public proposalCount;
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    event ProposalCreated(uint256 indexed proposalId, address indexed creator);
    event Voted(uint256 indexed proposalId, address indexed voter, uint256 option);

    function createProposal(
        string memory title,
        string memory description,
        string memory nounSeed,
        string[] memory options
    ) external {
        require(options.length >= 2, "At least two options required");
        proposals[proposalCount] = Proposal({
            creator: msg.sender,
            title: title,
            description: description,
            nounSeed: nounSeed,
            options: options,
            votes: new uint256[](options.length),
            exists: true
        });
        emit ProposalCreated(proposalCount, msg.sender);
        proposalCount++;
    }

    function vote(uint256 proposalId, uint256 option) external {
        require(proposals[proposalId].exists, "Proposal does not exist");
        require(option < proposals[proposalId].options.length, "Invalid option");
        require(!hasVoted[proposalId][msg.sender], "Already voted");

        proposals[proposalId].votes[option]++;
        hasVoted[proposalId][msg.sender] = true;

        emit Voted(proposalId, msg.sender, option);
    }

    function getProposal(uint256 proposalId)
        external
        view
        returns (
            string memory title,
            string memory description,
            string memory nounSeed,
            string[] memory options,
            uint256[] memory votes
        )
    {
        require(proposals[proposalId].exists, "Proposal does not exist");
        Proposal storage proposal = proposals[proposalId];
        return (
            proposal.title,
            proposal.description,
            proposal.nounSeed,
            proposal.options,
            proposal.votes
        );
    }
}