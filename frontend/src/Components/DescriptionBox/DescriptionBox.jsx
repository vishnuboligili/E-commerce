import React from 'react'
import './DescriptionBox.css'

export const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">
                Description
            </div>
            <div className="descriptionbox-nav-box">
                Reviews (122)
            </div>
        </div>
        <div className="descriptionbox-description">
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum soluta officiis voluptas hic eius vitae nobis totam dolores, explicabo pariatur qui consequuntur recusandae reiciendis eum, incidunt minima doloremque iste beatae!
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quod eligendi, ratione deleniti, dolorum aperiam, vitae illum eveniet quia nemo deserunt explicabo earum eaque iste quos illo harum fugiat rerum?
                </p>
            </div>
    </div>
  )
}
