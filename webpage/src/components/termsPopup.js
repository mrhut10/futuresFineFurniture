import React from 'react';
import moment from 'moment';
import { animated, useTransition } from 'react-spring';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import { MdClose } from 'react-icons/md';
import { useIdb } from '../hooks/react-use-idb'; // 'react-use-idb';

const AnimatedDialogOverlay = animated(DialogOverlay);
const AnimatedDialogContent = animated(DialogContent);

const TermsPopup = () => {
  const dateFormatCode = 'YYYY-MM-DD:hh-mm-ss';
  const [GlobalTermsDate, setGlobalTermsDate] = useIdb(
    'GlobalTermsDate',
    moment()
      .subtract(30, 'days')
      .format(dateFormatCode)
  );
  const showGlobalTermsPopupData = () => {
    const a = moment();
    const b = moment(GlobalTermsDate, dateFormatCode);
    const daysDifference = a.diff(b, 'days');
    return daysDifference > 7;
  };
  const dismisGlobalTermsPopup = () => {
    setGlobalTermsDate(moment().format(dateFormatCode));
  };
  const transitions = useTransition(showGlobalTermsPopupData, null, {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 10 },
  });

  return (
    <>
      {showGlobalTermsPopupData()
        ? transitions.map(
            ({ item, key, props: styles }) =>
              item && (
                <AnimatedDialogOverlay
                  key={key}
                  onDismiss={dismisGlobalTermsPopup}
                  style={{ opacity: styles.opacity }}
                  className="fixed inset-x-0 top-0 z-50 flex w-full h-full min-h-screen overflow-auto bg-transparent-wh"
                >
                  <AnimatedDialogContent
                    aria-label="CONVID-19 Message"
                    style={{
                      transitions: styles.y.interpolate(
                        value => `translate3d(0, ${value}px, 0)`
                      ),
                    }}
                    className="flex-1 mx-4 outline-none"
                  >
                    <div className="relative w-full max-w-xl px-4 pt-10 pb-8 mx-auto my-12 text-center text-gray-700 bg-white border">
                      <button
                        onClick={dismisGlobalTermsPopup}
                        type="button"
                        className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                      >
                        <span className="sr-only">CLose</span>
                        <span aria-hidden>
                          <MdClose className="text-xl" />
                        </span>
                      </button>
                      <h2>YES WE ARE OPEN!</h2>
                      <p>
                        Our valued customers Due to the developments surrounding
                        the COVID-19 Our top priority at the moment is the
                        safety and well-being of our staff and our customer’s.
                        please be mindful of this situation if you are visiting
                        the store, please practice social distancing, and
                        deliveries can be zero contact. For all you’re Furniture
                        needs <br />
                        14 smith st Centre point arcade Kempsey <br />
                        65626675 <br />
                        Opening hours - Monday- Friday 9am - 5pm <br />
                        Saturday 9am - 1pm <br />
                      </p>
                    </div>
                  </AnimatedDialogContent>
                </AnimatedDialogOverlay>
              )
          )
        : ''}
    </>
  );
};

export default TermsPopup;
