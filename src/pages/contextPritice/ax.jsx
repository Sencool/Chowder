import React from 'react'
import { UserContext } from './ax'

function ComponentF() {
  return (
    <div>
      <UserContext.Consumer>
        {
          (user) => {
            console.log(user)
            return (
                <div>
                  User context value {user}
                </div>
              )
          }
        }
      </UserContext.Consumer>
    </div>
  )
}

export default ComponentF