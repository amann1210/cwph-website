/* eslint-disable react/no-unescaped-entities */
import { useHistory } from "react-router-dom"
import "./Activities.css";
const past_events = [
  {
    id: 'charity-work',
    title: 'Charity Work',
    image: 'https://image.cnbcfm.com/api/v1/image/100900663-171960667r.jpg?v=1631568975&w=720&h=405',
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
            soluta repellat molestias consequuntur illo, magnam ipsum
            architecto est dignissimos assumenda odit, cumque exercitationem`
  },
  {
    id: 'charity-work',
    title: 'Charity Work',
    image: 'https://image.cnbcfm.com/api/v1/image/100900663-171960667r.jpg?v=1631568975&w=720&h=405',
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
            soluta repellat molestias consequuntur illo, magnam ipsum
            architecto est dignissimos assumenda odit, cumque exercitationem`
  },
  {
    id: 'charity-work',
    title: 'Charity Work',
    image: 'https://image.cnbcfm.com/api/v1/image/100900663-171960667r.jpg?v=1631568975&w=720&h=405',
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
            soluta repellat molestias consequuntur illo, magnam ipsum
            architecto est dignissimos assumenda odit, cumque exercitationem`
  }
]
const upcoming_events = [
  {
    id: 'charity-work',
    title: 'Charity Work',
    image: 'https://image.cnbcfm.com/api/v1/image/100900663-171960667r.jpg?v=1631568975&w=720&h=405',
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
            soluta repellat molestias consequuntur illo, magnam ipsum
            architecto est dignissimos assumenda odit, cumque exercitationem`
  },
  {
    id: 'charity-work',
    title: 'Charity Work',
    image: 'https://image.cnbcfm.com/api/v1/image/100900663-171960667r.jpg?v=1631568975&w=720&h=405',
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
            soluta repellat molestias consequuntur illo, magnam ipsum
            architecto est dignissimos assumenda odit, cumque exercitationem`
  },
  {
    id: 'charity-work',
    title: 'Charity Work',
    image: 'https://image.cnbcfm.com/api/v1/image/100900663-171960667r.jpg?v=1631568975&w=720&h=405',
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
            soluta repellat molestias consequuntur illo, magnam ipsum
            architecto est dignissimos assumenda odit, cumque exercitationem`
  }
]

function Activities() {
  const style = {
    color: "#000",
  };

  const history = useHistory()
  return (
    <div>
      <div className="page-heading header-text">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 style={style}>Activities</h1>
              <p style={style}>
                <a style={style} href="/">
                  Home
                </a>{" "}
                / <span style={style}>Activities</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="services-section services-page">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="activities-section-heading">
                <h2>Activities which our team has engaged in.</h2>
                <p>
                  Here are some of the activities in the past our team has been part
                  of and will continue to be.
                </p>
              </div>
            </div>
            <div className="col-md-12">
              <h4>Upcoming Events</h4>
            </div>

            {upcoming_events.map((event, i) => (
              <div className="col-lg-4 col-md-6 col-12" key={i}>
                <div className="service-item"
                  onClick={(e) => {
                    e.preventDefault();
                    history.push(`/activities/${event.id}`, {state: event})
                  }}
                  >
                  <img
                    className="act-image"
                    src={event.image}
                  />
                  <h4>{event.title}</h4>
                  <p className="activitiesPara">
                    {event.text}
                  </p>
                </div>
              </div>
            ))}
            <div className="col-md-12" style={{ marginTop: "10px" }}>
              <h4>Past Events</h4>
            </div>
            {past_events.map((event, i) => (
              <div className="col-lg-4 col-md-6 col-12" key={i}>
                <div className="service-item"
                  onClick={(e) => {
                    e.preventDefault();
                    history.push(`/activities/${event.id}`, {state: event})
                  }}
                >
                  <img
                    className="act-image"
                    src={event.image}
                  />
                  <h4>{event.title}</h4>
                  <p className="activitiesPara">
                    {event.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activities;
