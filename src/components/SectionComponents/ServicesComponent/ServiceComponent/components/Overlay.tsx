import { useEffect, useState } from 'react';

import { ServicenewDocument } from '@/prismicio-types';
import * as Select from '@radix-ui/react-select';
import styles from './Overlay.module.css';

import { asText, isFilled } from '@prismicio/client';

import { useActiveServiceStore } from '@/stores/useActiveServiceStore';
import Arrow from '@/components/SvgComponents/Arrow/Arrow';
import { JSXMapSerializer, PrismicRichText } from '@prismicio/react';

import { useRouter } from 'next/navigation';

type OverlayProps = {
  service: ServicenewDocument;
};

export default function Overlay({ service }: OverlayProps) {
  const {
    activeService,
    setActiveService,
    isContainerOpen,
    setIsContainerOpen
  } = useActiveServiceStore();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isContainerOpen) {
        setIsContainerOpen('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isContainerOpen, setIsContainerOpen]);

  const displayedService = service.data.description_items.find(
    (item) => asText(item.item_title) === activeService
  );

  const components: JSXMapSerializer = {
    paragraph: ({ children }) => <p>{children}</p>,
    heading5: ({ children }) => <h5>{children}</h5>,
    list: ({ children }) => <ul className={styles.list}>{children}</ul>,
    listItem: ({ children }) => (
      <li className={styles.listitem}>
        <Arrow height="10" />
        <span>{children}</span>
      </li>
    )
  };

  return (
    <div
      className={`${styles.overlay} ${isContainerOpen === service.id ? styles.open : ''}`}
    >
      <div className={styles.contentcontainer}>
        <div className={styles.dropdowncontainer}>
          <Select.Root
            key={activeService}
            open={isDropdownOpen}
            onOpenChange={setIsDropdownOpen}
            onValueChange={(value) => setActiveService(value)}
          >
            <Select.Trigger className={styles.select}>
              <Select.Value
                placeholder={`${asText(displayedService?.item_title)} ${isFilled.richText(displayedService?.item_title_second) ? `& ${asText(displayedService.item_title_second)}` : ''}`}
                className={styles.pickedValue}
              />
              <div
                className={`${styles.arrow} ${isDropdownOpen ? styles.dropdownopen : ''}`}
              >
                <Arrow height="15" />
              </div>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content position="popper" className={styles.dropdown}>
                <Select.Viewport>
                  {service.data.description_items
                    .filter(
                      (item) =>
                        asText(item.item_title) !==
                        asText(displayedService?.item_title)
                    )
                    .map((item, index) => (
                      <Select.Item
                        key={index}
                        value={asText(item.item_title) || `item-${index}`}
                        className={styles.option}
                      >
                        <Select.ItemText>
                          <span>
                            <PrismicRichText field={item.item_title} />{' '}
                            {isFilled.richText(item.item_title_second) && (
                              <>
                                <h5>&</h5>{' '}
                                <PrismicRichText
                                  field={item.item_title_second}
                                />
                              </>
                            )}
                          </span>
                        </Select.ItemText>
                      </Select.Item>
                    ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
        <div className={styles.textcontainer}>
          <PrismicRichText
            field={displayedService?.item}
            components={components}
          />
        </div>
      </div>

      <div className={styles.buttoncontainer}>
        <button
          onClick={() => {
            router.push('/contact');
          }}
        >
          Contact us
        </button>
      </div>
    </div>
  );
}
