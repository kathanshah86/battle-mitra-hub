
// Main App JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  if (menuToggle) {
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('show-mobile');
      authButtons.classList.toggle('show-mobile');
    });
  }
  
  // Password toggle
  const togglePasswordButtons = document.querySelectorAll('.toggle-password');
  if (togglePasswordButtons.length > 0) {
    togglePasswordButtons.forEach(button => {
      button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const passwordInput = document.getElementById(targetId);
        
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          this.innerHTML = '<i data-feather="eye-off"></i>';
        } else {
          passwordInput.type = 'password';
          this.innerHTML = '<i data-feather="eye"></i>';
        }
        
        feather.replace();
      });
    });
  }
  
  // Load featured tournaments on homepage
  const upcomingTournamentsEl = document.getElementById('upcomingTournaments');
  if (upcomingTournamentsEl) {
    // This would normally fetch from your backend
    // For this demo, we'll use mock data
    loadUpcomingTournaments();
  }
  
  // Load live matches on homepage
  const liveMatchesEl = document.getElementById('liveMatches');
  if (liveMatchesEl) {
    // This would normally fetch from your backend
    // For this demo, we'll use mock data
    loadLiveMatches();
  }
  
  // Load top players on homepage
  const topPlayersEl = document.getElementById('topPlayers');
  if (topPlayersEl) {
    // This would normally fetch from your backend
    // For this demo, we'll use mock data
    loadTopPlayers();
  }
  
  // Newsletter form submission
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      
      if (emailInput.value) {
        // This would normally send to your backend
        alert('Thank you for subscribing to our newsletter!');
        emailInput.value = '';
      }
    });
  }
});

// Mock data - This would normally come from your backend API
const mockTournaments = [
  {
    id: 1,
    title: "Battle Royale Championship",
    gameType: "battle-royale",
    entryFee: "₹500",
    status: "upcoming",
    startDate: "2025-05-20",
    endDate: "2025-05-22",
    format: "5v5 Teams",
    prizePool: "₹50,000",
    participantsCount: 42,
    maxParticipants: 64,
    region: "Asia",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "MOBA Masters Tournament",
    gameType: "moba",
    entryFee: "",
    status: "ongoing",
    startDate: "2025-05-10",
    endDate: "2025-05-15",
    format: "5v5 Teams",
    prizePool: "₹100,000",
    participantsCount: 32,
    maxParticipants: 32,
    region: "Global",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "FPS Pro League Season 4",
    gameType: "fps",
    entryFee: "₹1,000",
    status: "upcoming",
    startDate: "2025-05-25",
    endDate: "2025-06-10",
    format: "Solo",
    prizePool: "₹200,000",
    participantsCount: 56,
    maxParticipants: 128,
    region: "Europe",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Sports Gaming Cup",
    gameType: "sports",
    entryFee: "",
    status: "completed",
    startDate: "2025-04-15",
    endDate: "2025-04-20",
    format: "1v1",
    prizePool: "₹75,000",
    participantsCount: 64,
    maxParticipants: 64,
    region: "North America",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const mockLiveMatches = [
  {
    id: 1,
    tournament: "MOBA Masters Tournament",
    teamA: {
      name: "Phoenix Esports",
      logo: "https://via.placeholder.com/150?text=Phoenix",
      score: 2
    },
    teamB: {
      name: "Dragon Gaming",
      logo: "https://via.placeholder.com/150?text=Dragon",
      score: 1
    },
    game: "MOBA Legends",
    viewers: 12500,
    round: "Semi-Finals"
  },
  {
    id: 2,
    tournament: "FPS Pro League Season 3",
    teamA: {
      name: "Sniper Elite",
      logo: "https://via.placeholder.com/150?text=Sniper",
      score: 13
    },
    teamB: {
      name: "Headshot Heroes",
      logo: "https://via.placeholder.com/150?text=Headshot",
      score: 11
    },
    game: "Counter Strike",
    viewers: 8750,
    round: "Quarter-Finals"
  }
];

const mockPlayers = [
  {
    id: 1,
    name: "Ninja Master",
    avatar: "https://via.placeholder.com/150?text=NM",
    game: "Battle Royale",
    rank: 1,
    stats: {
      tournaments: 24,
      wins: 16,
      winRate: "67%",
      earnings: "₹325,000"
    }
  },
  {
    id: 2,
    name: "ProSniper",
    avatar: "https://via.placeholder.com/150?text=PS",
    game: "FPS",
    rank: 2,
    stats: {
      tournaments: 18,
      wins: 12,
      winRate: "66%",
      earnings: "₹280,000"
    }
  },
  {
    id: 3,
    name: "MobaKing",
    avatar: "https://via.placeholder.com/150?text=MK",
    game: "MOBA",
    rank: 3,
    stats: {
      tournaments: 30,
      wins: 19,
      winRate: "63%",
      earnings: "₹245,000"
    }
  }
];

// Helper function to format date
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-IN', options);
}

// Load upcoming tournaments on homepage
function loadUpcomingTournaments() {
  const container = document.getElementById('upcomingTournaments');
  const loader = document.getElementById('tournamentsLoader');
  
  // Simulate API call delay
  setTimeout(() => {
    if (loader) loader.style.display = 'none';
    
    const upcomingTournaments = mockTournaments.filter(t => t.status === 'upcoming');
    
    if (upcomingTournaments.length === 0) {
      container.innerHTML = '<p class="text-center text-gray">No upcoming tournaments found.</p>';
      return;
    }
    
    upcomingTournaments.forEach(tournament => {
      const tournamentCard = createTournamentCard(tournament);
      container.appendChild(tournamentCard);
    });
  }, 1000);
}

// Load live matches on homepage
function loadLiveMatches() {
  const container = document.getElementById('liveMatches');
  const loader = document.getElementById('matchesLoader');
  
  // Simulate API call delay
  setTimeout(() => {
    if (loader) loader.style.display = 'none';
    
    if (mockLiveMatches.length === 0) {
      container.innerHTML = '<p class="text-center text-gray">No live matches currently.</p>';
      return;
    }
    
    mockLiveMatches.forEach(match => {
      const matchCard = createLiveMatchCard(match);
      container.appendChild(matchCard);
    });
  }, 1500);
}

// Load top players on homepage
function loadTopPlayers() {
  const container = document.getElementById('topPlayers');
  const loader = document.getElementById('playersLoader');
  
  // Simulate API call delay
  setTimeout(() => {
    if (loader) loader.style.display = 'none';
    
    if (mockPlayers.length === 0) {
      container.innerHTML = '<p class="text-center text-gray">No player data available.</p>';
      return;
    }
    
    mockPlayers.forEach(player => {
      const playerCard = createPlayerCard(player);
      container.appendChild(playerCard);
    });
  }, 2000);
}

// Create tournament card element
function createTournamentCard(tournament) {
  const div = document.createElement('div');
  div.className = 'tournament-card';
  
  let statusClass = 'status-upcoming';
  let buttonClass = 'btn-upcoming';
  let buttonText = 'View Details';
  
  if (tournament.status === 'ongoing') {
    statusClass = 'status-ongoing';
    buttonClass = 'btn-ongoing';
    buttonText = 'View Matches';
  } else if (tournament.status === 'completed') {
    statusClass = 'status-completed';
    buttonClass = 'btn-completed';
    buttonText = 'View Results';
  }
  
  div.innerHTML = `
    <div class="tournament-image">
      <img src="${tournament.image}" alt="${tournament.title}">
      <div class="tournament-image-overlay"></div>
      <div class="tournament-status ${statusClass}">
        ${tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
      </div>
      <div class="tournament-badges">
        <div class="tournament-badge badge-game">${tournament.gameType}</div>
        ${tournament.entryFee ? 
          `<div class="tournament-badge badge-fee">Entry: ${tournament.entryFee}</div>` : 
          `<div class="tournament-badge badge-free">Free Entry</div>`
        }
      </div>
    </div>
    
    <div class="tournament-info">
      <h3 class="tournament-title">${tournament.title}</h3>
      
      <div class="tournament-meta">
        <div>
          ${tournament.status !== 'completed' ? 
            `Starts ${formatDate(tournament.startDate)}` : 
            `Ended ${formatDate(tournament.endDate)}`
          }
        </div>
        <div>${tournament.format}</div>
      </div>
      
      <div class="tournament-stats">
        <div class="tournament-stat">
          <div class="stat-label">Prize Pool</div>
          <div class="stat-value prize-value">${tournament.prizePool}</div>
        </div>
        
        <div class="tournament-stat">
          <div class="stat-label">Participants</div>
          <div class="stat-value">${tournament.participantsCount}/${tournament.maxParticipants}</div>
        </div>
        
        <div class="tournament-stat">
          <div class="stat-label">Region</div>
          <div class="stat-value">${tournament.region}</div>
        </div>
      </div>
      
      <div class="tournament-action">
        <a href="tournament-details.html?id=${tournament.id}" class="tournament-button ${buttonClass}">
          ${buttonText}
        </a>
      </div>
    </div>
  `;
  
  return div;
}

// Create live match card element
function createLiveMatchCard(match) {
  const div = document.createElement('div');
  div.className = 'match-card';
  
  div.innerHTML = `
    <div class="match-header">
      <div class="match-tournament">${match.tournament}</div>
      <div class="match-live-badge">
        <div class="live-indicator"></div>
        LIVE
      </div>
    </div>
    
    <div class="match-teams">
      <div class="match-team">
        <div class="team-logo">
          <img src="${match.teamA.logo}" alt="${match.teamA.name}">
        </div>
        <div class="team-name">${match.teamA.name}</div>
      </div>
      
      <div class="match-score">
        <div class="match-score-value">${match.teamA.score}</div>
        <div class="match-vs">VS</div>
        <div class="match-score-value">${match.teamB.score}</div>
      </div>
      
      <div class="match-team">
        <div class="team-logo">
          <img src="${match.teamB.logo}" alt="${match.teamB.name}">
        </div>
        <div class="team-name">${match.teamB.name}</div>
      </div>
    </div>
    
    <div class="match-info">
      <div class="match-info-item">
        <i data-feather="monitor" class="h-4 w-4"></i>
        <span>${match.game}</span>
      </div>
      
      <div class="match-info-item">
        <i data-feather="eye" class="h-4 w-4"></i>
        <span>${match.viewers.toLocaleString()} viewers</span>
      </div>
      
      <div class="match-info-item">
        <i data-feather="award" class="h-4 w-4"></i>
        <span>${match.round}</span>
      </div>
    </div>
    
    <div class="match-actions">
      <a href="#" class="match-action-btn watch-btn">Watch Now</a>
      <a href="#" class="match-action-btn details-btn">Details</a>
    </div>
  `;
  
  // Replace feather icons
  feather.replace(div.querySelectorAll('[data-feather]'));
  
  return div;
}

// Create player card element
function createPlayerCard(player) {
  const div = document.createElement('div');
  div.className = 'player-card';
  
  div.innerHTML = `
    <div class="player-header">
      <div class="player-rank">${player.rank}</div>
      <div class="player-avatar">
        <img src="${player.avatar}" alt="${player.name}">
      </div>
      <h3 class="player-name">${player.name}</h3>
      <div class="player-game">${player.game}</div>
    </div>
    
    <div class="player-stats">
      <div class="player-stat-row">
        <div class="player-stat-label">Tournaments</div>
        <div class="player-stat-value">${player.stats.tournaments}</div>
      </div>
      
      <div class="player-stat-row">
        <div class="player-stat-label">Wins</div>
        <div class="player-stat-value">${player.stats.wins}</div>
      </div>
      
      <div class="player-stat-row">
        <div class="player-stat-label">Win Rate</div>
        <div class="player-stat-value">${player.stats.winRate}</div>
      </div>
      
      <div class="player-stat-row">
        <div class="player-stat-label">Earnings</div>
        <div class="player-stat-value">${player.stats.earnings}</div>
      </div>
    </div>
    
    <div class="player-action">
      <a href="player-profile.html?id=${player.id}" class="player-view-btn">View Profile</a>
    </div>
  `;
  
  return div;
}
