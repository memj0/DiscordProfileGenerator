document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const displayName = document.getElementById('displayName');
    const username = document.getElementById('username');
    const pronouns = document.getElementById('pronouns');
    const avatarUrl = document.getElementById('avatarUrl');
    const avatarFile = document.getElementById('avatarFile');
    const avatarUploadBtn = document.getElementById('avatarUploadBtn');
    const primaryColor = document.getElementById('primaryColor');
    const accentColor = document.getElementById('accentColor');
    const bannerUrl = document.getElementById('bannerUrl');
    const bannerFile = document.getElementById('bannerFile');
    const bannerUploadBtn = document.getElementById('bannerUploadBtn');
    const bio = document.getElementById('bio');
    const charCount = document.getElementById('charCount');
    const status = document.getElementById('status');
    const memo = document.getElementById('memo');
    const statusType = document.getElementById('statusType');
    
    
    // Preview Elements
    const profileName = document.getElementById('profileName');
    const profileHandle = document.getElementById('profileHandle');
    const profileAvatar = document.getElementById('profileAvatar');
    const profileBanner = document.getElementById('profileBanner');
    const profileBio = document.getElementById('profileBio');
    const profileStatus = document.getElementById('profileStatus');
    const profileMemo = document.getElementById('profileMemo');

    // Event Listeners
    displayName.addEventListener('input', updatePreview);
    username.addEventListener('input', updatePreview);
    pronouns.addEventListener('input', updatePreview);
    avatarUrl.addEventListener('input', updatePreview);
    primaryColor.addEventListener('input', updatePreview);
    accentColor.addEventListener('input', updatePreview);
    bannerUrl.addEventListener('input', updatePreview);
    bio.addEventListener('input', updateBio);
    status.addEventListener('input', updatePreview);
    memo.addEventListener('input', updatePreview);
    statusType.addEventListener('change', updatePreview);

    
    // File Upload Handlers
    avatarUploadBtn.addEventListener('click', () => avatarFile.click());
    bannerUploadBtn.addEventListener('click', () => bannerFile.click());
    
    avatarFile.addEventListener('change', handleAvatarUpload);
    bannerFile.addEventListener('change', handleBannerUpload);

    function getColorBrightness(hexColor) {
    // Remove # if present
    hexColor = hexColor.replace('#', '');
    
    // Convert to RGB
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);
    
    // Calculate brightness (perceived luminance)
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

    // Functions
    function updatePreview() {
    // Update name and handle
    profileName.textContent = displayName.value || 'Username';
    
    let handleText = username.value ? `@${username.value}` : 'user#1234';
    if (pronouns.value) {
        handleText += ` • ${pronouns.value}`;
    }
    profileHandle.textContent = handleText;
    
    // Update avatar
    if (avatarUrl.value) {
        profileAvatar.style.backgroundImage = `url(${avatarUrl.value})`;
    }
    
    // Update gradient on the profile body (not banner)
    document.documentElement.style.setProperty('--primary', primaryColor.value);
    document.documentElement.style.setProperty('--accent', accentColor.value);

    const primaryBrightness = getColorBrightness(primaryColor.value);
    const accentBrightness = getColorBrightness(accentColor.value);
    const averageBrightness = (primaryBrightness + accentBrightness) / 2;
    
    // Determine text color
    const textElements = [
        profileName,
        profileHandle,
        profileBio,
        profileMemo
    ];
    
    textElements.forEach(el => {
        el.classList.remove('text-light', 'text-dark');
        el.classList.add(averageBrightness > 0.6 ? 'text-dark' : 'text-light');
    });
    
    // Banner remains either solid color or custom image
    if (bannerUrl.value) {
        profileBanner.style.background = `url(${bannerUrl.value}) center/cover no-repeat, var(--discord-darker)`;
    } else {
        profileBanner.style.background = 'var(--discord-darker)';
    }
    
    // Update status and memo
    profileStatus.textContent = status.value || 'Just chilling';
    profileMemo.textContent = memo.value || 'Memo appears here';

    const statusIndicator = document.createElement('div');
    statusIndicator.className = `status-indicator status-${statusType.value}`;
    
    // Remove any existing status indicator
    const existingIndicator = profileAvatar.querySelector('.status-indicator');
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    // Add the new status indicator
    profileAvatar.appendChild(statusIndicator);
}
    
    function updateBio() {
    const bioText = bio.value || 'This is where your bio would appear...';
    // Preserve line breaks by replacing newlines with <br> tags or using white-space: pre-wrap
    profileBio.textContent = bioText;
    charCount.textContent = `${bio.value.length}/190`;
}
    
    function handleAvatarUpload(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                avatarUrl.value = event.target.result;
                updatePreview();
            };
            reader.readAsDataURL(file);
        }
    }
    
    function handleBannerUpload(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                bannerUrl.value = event.target.result;
                updatePreview();
            };
            reader.readAsDataURL(file);
        }
    }
    
    // Initialize
    updatePreview();
    updateBio();
    updatePreview();
    updateBio();

    const statusIndicator = document.createElement('div');
    statusIndicator.className = 'status-indicator status-online'; // Default to online (green)
    profileAvatar.appendChild(statusIndicator);

    });
