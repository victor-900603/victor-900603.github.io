const scrollSpyCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const indicator = document.querySelector('#indicator');
            const link = document.querySelector(`#${entry.target.id}-link`);
            if (indicator && link) {
                indicator.style.width = `${link.offsetWidth}px`;
                indicator.style.left = `${link.offsetLeft}px`;

                document.querySelectorAll('.nav-item').forEach(item => {
                    item.classList.remove('active');
                });
                link.classList.add('active');
            }
        }
    })
}

const observer = new IntersectionObserver(scrollSpyCallback, {
    root: null,
    rootMargin: '-80px 0px 0px 0px',
    threshold: [0.2, 0.5]
});

const setScrollSpy = () => {
    try {
        document.querySelectorAll('.nav-item').forEach(item => {
            const targetId = item.attributes.href?.value;
        
            if (targetId) {
                const target = document.querySelector(targetId);
        
                if (target) {
                    item.addEventListener('click', e => {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    });
                    
                    observer.observe(target);
                }
            }
        });
    } catch (error) {
        console.error('ScrollSpy error:', error);
    }
}

export default setScrollSpy;