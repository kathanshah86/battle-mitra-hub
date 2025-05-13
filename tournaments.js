
// Tournaments page JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Get filter elements
  const searchInput = document.getElementById('searchInput');
  const statusFilter = document.getElementById('statusFilter');
  const gameFilter = document.getElementById('gameFilter');
  const feeFilter = document.getElementById('feeFilter');
  const regionFilter = document.getElementById('regionFilter');
  const sortSelect = document.getElementById('sortSelect');
  const resultsCount = document.getElementById('resultsCount');
  const tournamentsList = document.getElementById('tournamentsList');
  const noTournamentsFound = document.getElementById('noTournamentsFound');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');
  const resetFilters = document.getElementById('resetFilters');
  
  // Initialize tournaments
  let allTournaments = [];
  let filteredTournaments = [];
  
  // Fetch tournaments (mock)
  fetchTournaments();
  
  // Add event listeners
  if (searchInput) searchInput.addEventListener('input', applyFilters);
  if (statusFilter) statusFilter.addEventListener('change', applyFilters);
  if (gameFilter) gameFilter.addEventListener('change', applyFilters);
  if (feeFilter) feeFilter.addEventListener('change', applyFilters);
  if (regionFilter) regionFilter.addEventListener('change', applyFilters);
  if (sortSelect) sortSelect.addEventListener('change', applySorting);
  if (resetFiltersBtn) resetFiltersBtn.addEventListener('click', resetAllFilters);
  if (resetFilters) resetFilters.addEventListener('click', resetAllFilters);
  
  // Fetch tournaments function (mock)
  function fetchTournaments() {
    // This would normally fetch from your backend API
    // Using the mock data from app.js
    tournamentsLoader.style.display = 'block';
    
    // Simulate API delay
    setTimeout(() => {
      // In a real app, this would be an API call
      allTournaments = window.mockTournaments || [
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
        },
        {
          id: 5,
          title: "Mobile Gaming Championship",
          gameType: "battle-royale",
          entryFee: "₹300",
          status: "upcoming",
          startDate: "2025-06-05",
          endDate: "2025-06-07",
          format: "Squad",
          prizePool: "₹40,000",
          participantsCount: 75,
          maxParticipants: 100,
          region: "Asia",
          image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 6,
          title: "Strategy Masters League",
          gameType: "strategy",
          entryFee: "₹800",
          status: "upcoming",
          startDate: "2025-05-30",
          endDate: "2025-06-15",
          format: "1v1",
          prizePool: "₹150,000",
          participantsCount: 24,
          maxParticipants: 32,
          region: "Europe",
          image: "https://images.unsplash.com/photo-1569017388730-020b5f80a004?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
      ];
      
      filteredTournaments = [...allTournaments];
      applySorting();
      renderTournaments();
      tournamentsLoader.style.display = 'none';
    }, 1000);
  }
  
  // Apply filters function
  function applyFilters() {
    const searchQuery = searchInput ? searchInput.value.toLowerCase() : '';
    const status = statusFilter ? statusFilter.value : 'all';
    const gameType = gameFilter ? gameFilter.value : 'all';
    const entryFee = feeFilter ? feeFilter.value : 'all';
    const region = regionFilter ? regionFilter.value : 'all';
    
    filteredTournaments = allTournaments.filter(tournament => {
      // Search query filter
      const matchesSearch = tournament.title.toLowerCase().includes(searchQuery);
      
      // Status filter
      const matchesStatus = status === 'all' || tournament.status === status;
      
      // Game type filter
      const matchesGameType = gameType === 'all' || tournament.gameType === gameType;
      
      // Entry fee filter
      const matchesEntryFee = entryFee === 'all' || 
        (entryFee === 'free' && !tournament.entryFee) || 
        (entryFee === 'paid' && tournament.entryFee);
      
      // Region filter
      const matchesRegion = region === 'all' || tournament.region === region;
      
      return matchesSearch && matchesStatus && matchesGameType && matchesEntryFee && matchesRegion;
    });
    
    applySorting();
    renderTournaments();
  }
  
  // Apply sorting function
  function applySorting() {
    const sortOrder = sortSelect ? sortSelect.value : 'newest';
    
    switch(sortOrder) {
      case 'newest':
        filteredTournaments.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        break;
      case 'oldest':
        filteredTournaments.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
        break;
      case 'prize-high':
        filteredTournaments.sort((a, b) => parseInt(b.prizePool.replace(/[^\d]/g, '')) - parseInt(a.prizePool.replace(/[^\d]/g, '')));
        break;
      case 'prize-low':
        filteredTournaments.sort((a, b) => parseInt(a.prizePool.replace(/[^\d]/g, '')) - parseInt(b.prizePool.replace(/[^\d]/g, '')));
        break;
    }
    
    renderTournaments();
  }
  
  // Render tournaments function
  function renderTournaments() {
    if (!tournamentsList) return;
    
    // Update results count
    if (resultsCount) {
      resultsCount.textContent = `${filteredTournaments.length} tournaments found`;
    }
    
    // Clear tournaments list
    tournamentsList.innerHTML = '';
    
    // Show or hide no tournaments found message
    if (filteredTournaments.length === 0) {
      if (noTournamentsFound) noTournamentsFound.style.display = 'block';
    } else {
      if (noTournamentsFound) noTournamentsFound.style.display = 'none';
      
      // Render tournament cards
      filteredTournaments.forEach(tournament => {
        const tournamentCard = createTournamentCard(tournament);
        tournamentsList.appendChild(tournamentCard);
      });
    }
  }
  
  // Reset all filters function
  function resetAllFilters() {
    if (searchInput) searchInput.value = '';
    if (statusFilter) statusFilter.value = 'all';
    if (gameFilter) gameFilter.value = 'all';
    if (feeFilter) feeFilter.value = 'all';
    if (regionFilter) regionFilter.value = 'all';
    if (sortSelect) sortSelect.value = 'newest';
    
    filteredTournaments = [...allTournaments];
    applySorting();
    renderTournaments();
  }
  
  // Reusing the createTournamentCard function from app.js
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
  
  // Helper function to format date
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  }
});
