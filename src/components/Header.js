import React from 'react';
import ActionsMenu from './ActionsMenu';
import { useAuth } from '../context/loginContext';
import { useRouter } from '../hooks/useRouter';

export const Header = ({
  showDropdown = true,
  updateQuery = () => { }
}) => {
  const { signOut } = useAuth();
  const router = useRouter();
  const handleSignOut = () => {
    signOut();
    router.push('/');
  }
  const actions = [
    {
      label: 'Created',
      action: () => updateQuery('created'),
    },
    {
      label: 'Assigned',
      action: () => updateQuery('assigned'),
    },
    {
      label: 'Mentioned',
      action: () => updateQuery('mentioned'),
    },
    {
      label: 'Review requested',
      action: () => updateQuery('review_requested'),
    },
    {
      action: () => {
        window.open(
          'https://www.buymeacoffee.com/thewebuiguy',
          '_blank' // <- This is what makes it open in a new window.
        );
      },
      label: "Buy me a coffee",
    },
    {
      action: handleSignOut,
      label: 'Signout'
    }
  ]

  

  return (
    <header className="fixed flex flex-row items-center justify-between p-3 text-white rounded-t-sm bg-primary align-center" style={{ width: '402px'}}>
      <img src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAABjCAYAAAB5XvlIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAodSURBVHgB7Z1PbB3FHcd/7h8kYkt1qEqQQGKthF6oCDkUKjj0+UJUipo/SPRSglOVHlBV0lYV6iV57o1INEFVqOihthP1AMLECAh/Dng5BCVwACO4EMJbpCAFEBAk2znkMMz3zayzft6dnd03+3fmI42cl5n1W+/7vpnf/Gbm9xshxxqMsXH+43ZedvHS4cXjZVxWX+LlPVleGBkZ8cnhUAFB8XKIl2+YPj1epsjhiIOLoyNFkpceLx45HCGylzIBerrd5HAYFFWUh8hhL1wAj7JiQM91OzlohCyDCXuoR8UR8LKDzxovkcX8gOzjiE6jpQ/O0el33qfPv/iq/3rL9T+mnZ07aevETWmXerwc4KVLFmNVj8V7qw7/sahqcz74jA4+/jQX1Nex9fdM/oIe+u29tOUn16l+DXqrCZt7re+RXSiNa/RSfz14NFFU4PXFM6LNl1+rfhWcqlNkMbYJK9ElAKEcPnaCVlYuUxoQ3uF/n0hrtossxhphydnaeFL93DOnlD3VIEsfnusXBVbPDm3qsTxV5dKHH1FWnn9Jaa5hmehmshQnLM5FPvPL0luFfBxcSGuymSzFJmGNU/lU8Z61wCZhBUkVY6ObKA8a1zl3g82MjV6r4/jcwFYv9ZqALMUKYckZodLjfvcdt1FW9j3wK1V14BykLUaKCtM3pb2z74F7dXqgNfbeN0k38GUeBT5ZTKuFpSuqkOnHHu6vCaaBZZ1H9t+f1myOLOb71FKyigrAGN/JRXPNNT/kroTP6MqVK+vqR3n9ww/+hv7wu1SnOobBv5DFtHIROo+o4oBn/aJcE9x2841ZDPz9XFiz5GgPEBXLdijCNDPkaBc1EFWPuYMV7cKJymGcGojqXSeqllGxqPC+XXK0C1Z9T7VIjlga6yBlhlwKEqtP1BRBI4VVgKgmyWGUxgmrCFFxZ+Z75DBKo4TlRNUcGiMsJ6pm0Qhh1VhUODDhkaN5MLMuhcSgHWw44CCd4WU3E1EBrafWuxtYiT0V1EHm8Hl5Ez9tDSlZW2Gxkoc/w8IafG+frgrNCruulsJiFdhUBQprkIDWCy2gFlI7YbGKDPUShTUI7s3n5QX8uy0HMGolLFbh7K9CYQ3iUwvss9oIi1XsUqiRsKKE9lnYmxVinzHhMhkMmhLQED1oLYRVtajkPdRRWIMEtF5oAeVEignxwqZIHTAFz3GBl7lG2YOsJD+Vxn00EfjPjjARqVD374RTd4blA+/l6bxPpT0Wq5FHHU+Nmo9PojeLdWswEYsehz2Ged4BL3vSnnNlwqqTqOT9tEFYUaL2GX5i2OuSOab48048lFuJsOomKnlPbRNWGUwmzVwLERbbOMsIeLmED7+OogJOWLnA898RZ9QbE5Y0INHdYhwfV9wIUQ23vjhhEa2sXqbl5VUaG9tEo5uu1b0M9tyGHbhDC0sK6hCJ/H5lYVRUIKewfF72k/jbwxyHJr40pQExzb+4SK/5Z9eSJQCEE9j7604/loUGG4bEoYSF6SeJLAxlYlxUIK+wBr+t8ouG4T4UWm1BCPK0uPZbrr+O/vXPA2kJEzY8h1zCYmLP0Ukq/8EVIipgSlgxv7dDwjz4JdUoRLeOqEIgrqef+AeNqYfHzVEvfd4dpDC+O1QuhYmqSDBE8HKAlx385QQve0jEzgqoQp7633PakaLR7vgzp9Ka7Y6+yCws/g2EPVX2N6+RohoEsydeFniBDwgig9hgoy1QiWcbzwcX6PTb72e6BqlelleVWTvWaSKTsKSroKvbHobhymp6CpEUWiGqOPA3IY4WL/BkIyY8htVpKjjM5Omz2UQFllcu01tnl1RNvOiLrGnlTqY1wNg9/xKfZXCFh3lpMEZvv/WnOlmzBmmtqOKQMyuU0I7tyGLUPrv4ZfZkCf3r1EPnj6IvtIUljVBP1QYpQJ6amd/w/xijX//iTL87RRDZfVxgGlglqkGkIbwgS+h07tBVoXlUY7IMhcqUbMefPRUrqrh2KTlogNWiikPaZ7MD9hninPqU0T7b5t1IedimDpX5bfRFFmF1kiow/GnMGtaAAFPy/ZETlRppnx2FuyOrfXZXjpj2iCZ9289uUTUJoi+0hCWNdi+pfi6DqELmXeYso0i3Rlf61SC0J5PaIj591oQJSFuc4sfyoy90eyzlMkWelGyn315KazJBjlxI+2xW1ebvf3pQK6Y9wPKOhl3sR1/oCstTVeZJyaZxjUeO3EhTwk+qR/6gJ6b/nCquu+7Y3m+XwuzIwN54G7PY2wRsrk5SJYbE//9nuj9bf23xbD9pwsrKal9sMPCR1mX7rbfovs86dIUVqCpxI9GVcR00uuGAHEMBu4vbqj6lLL8hhcs9ersY4piN24+lOxQGqsq7f559lqHxTShtiaPlYMmoqGcZUExvBbSEJRWZeHN77+v0x+wsaKRkc+4GA8jPbg+ZJ/Q1BnGVWfxYiRvnMVbDo64L2rqUbOUhl4ogLlM9V0AKUYEswlpQVcLQS5uSInvWI7+/X2fqOkcOo2BXBQlvfUDD4ZPGqkimjX5MxDXvqNogI/zxZ1/pZ84KDfot0iGHra43aBjtcsmiVIra6FdHmEh6gCU6L8Nl6O2m4e0n02AhmhWPRxXA8rFIDYWJE9FT+BtY8kl0/P9JVkakQv4GR1lxdKkiWD4aK6xBmAh10IkUj8qGCZWb5iRVCMtHa4Rlmrx73jHDWCBz+CT8LZXA8nfzxQ4PtsI/kC4bHvPGYLa/4VE2XLSbHnMhuc2Dh8ryDY2LLEP4nYLu/QgzxwFymIcJg2+WiW9wEugZjlYtKHm/JkXlxDVAUUFBYHuEQUFQAhL+qYBqABNH2LpUDIkRWGyiVsFty4AJe6hHxRGQiMBi9SK6jfuxZtIa4Czkq2+coU96F9aOSmH1YOfknTq7MjwS8Sy6ZDFW9VjStlP6npY+OEeHj51I3OGqGSQDvdWEzb1WY1P35kR5hA07Kf926EnltmnU9YNpqE8Zwa6cIouxTVi7kyoglGMa5yL7bbm4Dj7+37Rmu8hirBGWHAYTPeU4whaGBNDhPLe/EEZAgbEj8U3Eph5LufzyVvpxtJhrlME1rD4baZOwvKQK7CFbXskeFefj4EJak81kKa7Hat971gKbhBUkVYyNbqI8aFzn3A0WkPgh44SR5sHMdWz1bkprEpCl2CQsX1UJr3pWUo6wtSapZR6sEZb8kIOkepwEztJraRxhs/pcpG0OUuWxsunH/qgzvGkddSPLj7DZtlaIWRp2Nihna4g4OP+yvyEeBXo0CEqjZ6vkCFudsHHbTJdEipZUzkd2NyD6im48KRL5/EyeCXDUHSbO0/VYcVS6h99RIUzs0zeVLjhKjxV9sNNRb5jZXNShqDxyOJjouXpseBaZ66kcUZiwufKGDUCP507mOJKRvVfa8bUQtOm6XioZ69wNOrCrySw9upoj5lMSnnu/LsfY6sx3GwlqIG+JHJMAAAAASUVORK5CYII="} className="h-5" alt="git glance logo" />
      <h3 className="text-xl font-bold tracking-tight">
        Git Glance
      </h3>
      {showDropdown && <ActionsMenu actions={actions} />}
    </header>
  )
};