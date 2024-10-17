import { useParams } from 'react-router-dom'; 
import React, { useEffect, useRef, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const Room = () => {
  const { id } = useParams();  // Ensure the correct param name ('id' from the route)
  const meetingContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);  // State to track loading status

  useEffect(() => {
    const myMeeting = async () => {
      if (!id) {
        console.error("Room ID is missing!");
        return;
      }

      setLoading(true);  // Set loading state to true

      // Generate Kit Token
      const appID = 913041781;
      const serverSecret = "e7ae8183212d0e4e4d28bce764bfcef5";
      const userID = "user_" + Math.floor(Math.random() * 1000);  // Generate random user ID
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        id,  // Use the correct room ID from params
        userID,
        "AmitBhandari"
      );

      // Create instance object from Kit Token
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      
      // Start the call
      try {
        await zp.joinRoom({
          container: meetingContainerRef.current,
          sharedLinks: [
            {
              name: 'Personal link',
              url: `http://localhost:3000/room/${id}`,  // Correct room ID in the URL
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,  // 1-on-1 calls
          },
        });
      } catch (error) {
        console.error("Failed to join the room", error);
        alert("Failed to join the room. Please try again."); // Notify user about failure
      } finally {
        setLoading(false); // Reset loading state after attempting to join
      }
    };

    myMeeting();  // Call the function to start the meeting
  }, [id]);

  return (
    <div>
      {/* The video call container */}
      <div
        className="myCallContainer"
        ref={meetingContainerRef}
        style={{ width: '100vw', height: '100vh', marginTop: '20px' }}  // Adjust margin for better layout
      >
        {loading && <p>Joining the call...</p>} {/* Display loading message */}
      </div>
    </div>
  );
}

export default Room;
