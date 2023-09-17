import "./featured.css"

const Featured = () => {
  return (
    <div className="featured">
        <div className="featuredItem">
            <img src="https://www.seabourn.com/content/dam/sbn/inventory-assets/ports/VCE/rialto-europe-bridge-245507692.jpg" alt="" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Venice</h1>
                <h2>57 properties</h2>
            </div>
        </div>
        <div className="featuredItem">
            <img src="https://www.celebritycruises.com/blog/content/uploads/2022/01/famous-landmarks-in-paris-arc-de-triomphe-hero-1024x683.jpg" alt="" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Paris</h1>
                <h2>73 properties</h2>
            </div>
        </div>
        <div className="featuredItem">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Dubai_Skylines_at_night_%28Pexels_3787839%29.jpg/640px-Dubai_Skylines_at_night_%28Pexels_3787839%29.jpg" alt="" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Dubai</h1>
                <h2>67 properties</h2>
            </div>
        </div>
    </div>
  )
}

export default Featured
