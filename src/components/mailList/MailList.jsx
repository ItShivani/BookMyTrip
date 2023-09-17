import "./mailList.css"

const MailList = () => {
  return (
    <div className="mail">
        <h1 className="mailTitle">Subcribe now to save money.</h1>
        <span className="mailDesc">Get access to hundreds of deals!</span>
        <div className="mailInputContainer">
            <input type="text" placeholder="Email" />
            <button>Subscribe</button>
        </div>
      
    </div>
  )
}

export default MailList
