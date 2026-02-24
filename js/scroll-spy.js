const scrollSpyCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const indicator = document.querySelector('#indicator');
            const link = document.querySelector(`#${entry.target.id}-link`);
            indicator.style.width = `${link.offsetWidth}px`;
            indicator.style.left = `${link.offsetLeft}px`;
        } else {
            
        }
    })
}

const observer = new IntersectionObserver(scrollSpyCallback, {
    root: null,
    rootMargin: '-80px 0px 0px 0px',
    threshold: [0.3, 1]
});

const setScrollSpy = () => {
    try {
        document.querySelectorAll('.nav-item').forEach(item => {
            const targetId = item.attributes.href.value;
        
            if (targetId) {
                const target = document.querySelector(targetId);
        
                item.addEventListener('click', e => {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                });
                
                observer.observe(target);
            }
        
        });
    } catch (error) {
        console.error(error);
    }

}

export default setScrollSpy;