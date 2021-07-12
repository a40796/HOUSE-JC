import React from 'react'

const Projects_cell = () => {
    return (
        <div>
          <div className="searchform">        
           <div className="left">
               <ul>
                   <li>INTERIOR DESIGN</li>
                   <li>CULTURE ARCHITECTURE</li>
                   <li>PUBLIC ARCHITECTURE</li>
                   <li>COMMERCIAL&OFFICES</li>
               </ul>
           </div>
           <div className="title">PROJECTS</div>
       </div>
       <div className="main">
           <div className="id">
               <div className="left"><img src="../img/project1.png" alt=""/></div>
               <div className="right">
                   <h2>Interior Design</h2>
                   <h4>alphaville configures skyhole house for a variety of programs</h4>
                   <p>led by kentaro takeguchi and asako yamamoto, japanese architecture office alphaville, has completed a primarily single storey dwelling that serves as both an atelier and residence for an artistic couple. in order to host various activities, including temporary exhibitions and other social events, ‘skyhole’ has been designed to be as flexible as possible.</p>
                   <div className="readmore">
                       <p>Read<br/> More</p>
                       <i className="fa fa-book" aria-hidden="true"></i>
                   </div>
               </div>
           </div>
           <div className="ca">
               <div className="left"><img src="../img/project2.png" alt=""/></div>
               <div className="right">
                   <h2>Culture  Architecture</h2>
                   <h4>Osaka Castle</h4>
                   <p>located in the osaka castle park in the chuo district of osaka city (the ancient setzu country higashi-nari-gun), is one of the most famous places in osaka. it is the three famous castles in japanese history alongside nagoya castle and himeji castle. jincheng”.</p>
                   <div className="readmore">
                       <p>Read<br/> More</p>
                       <i className="fa fa-book" aria-hidden="true"></i>
                   </div>
               </div>
           </div>

           <div className="pa">
               <div className="left"><img src="../img/project3.png" alt=""/></div>
               <div className="right">
                   <h2>Public Architecture</h2>
                   <h4>Tama Art University Library </h4>
                   <p>is the academic library associated with Tama Art University consisting of two library locations in Tokyo, Japan: one on the Hachioji campus and the other on the Kaminoge campus. Together, the libraries serve university students and faculty as an information database with a primary focus on art education and research. Its collection also includes materials on design, architecture, film, photography, and other related topics of study.</p>
                   <div className="readmore">
                       <p>Read<br/> More</p>
                       <i className="fa fa-book" aria-hidden="true"></i>
                   </div>
               </div>
           </div>

           <div className="co">
               <div className="left"><img src="../img/project6.png" alt=""/></div>
               <div className="right">
                   <h2>Commercial&offices</h2>
                   <h4>Kojimach Terrace</h4>
                   <p>Kojimach Terrace
                       An interior and exterior design project for an eleven-story office building located in the Kojimachi neighbourhood in central Tokyo. Typical office buildings are usually built as closed-off blocks with artificial climate control that do not share any real physical connection with their exterior environments.  </p>
                   <div className="readmore">
                       <p>Read<br/> More</p>
                       <i className="fa fa-book" aria-hidden="true"></i>
                   </div>
               </div>
           </div>
 
       </div>
        </div>
    )
}

export default Projects_cell
