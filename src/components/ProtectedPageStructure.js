import Header from './/Header';
import Main from './/Main';

function ProtectedPageStructure ({userEmail, ...props}) {
    return (
                <>
                  <Header
                  userEmail={userEmail} />
                  <Main
                    {...props}
                  />
                </>
              )
}

export default ProtectedPageStructure