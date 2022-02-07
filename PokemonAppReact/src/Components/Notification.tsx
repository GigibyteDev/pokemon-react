import '../Styles/Notification.css';

export type notificationTypes = 'info' | 'success' | 'error' | 'hidden'

interface NotificationPropsI {
  type: notificationTypes,
  message: string
}

const Notification = (props: NotificationPropsI) => {

  let noticationStyles: React.CSSProperties = {
    backgroundColor: props.type === 'success' ? "#5fc555" : props.type === "error" ? "#f75252" : "#b0b3b8"
  }

  return (
    <div>
      { props.type !== 'hidden' && (
        <div className='notification-wrapper'>
          <div id="notificationBox" style={noticationStyles} className={`notification ${props.type === 'error' ? 'shake' : 'fade' }`}>
            <div className='notification-header'>{props.type}</div>
            <div className='notification-text'>{props.message}</div>
          </div>
        </div>
        )
      }
    </div>
  );
};

export default Notification;
