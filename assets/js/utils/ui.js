/* ----------------------------------------------------------------------------
 * Easy!Appointments - Online Appointment Scheduler
 *
 * @package     EasyAppointments
 * @author      A.Tselegidis <alextselegidis@gmail.com>
 * @copyright   Copyright (c) Alex Tselegidis
 * @license     https://opensource.org/licenses/GPL-3.0 - GPLv3
 * @link        https://easyappointments.org
 * @since       v1.5.0
 * ---------------------------------------------------------------------------- */

/**
 * UI utility.
 *
 * This module provides commonly used UI functionality.
 */
window.App.Utils.UI = (function () {
    /**
     * Get the Flatpickr compatible date format.
     *
     * @return {String}
     */
    function getDateFormat() {
        switch (vars('date_format')) {
            case 'DMY':
                return 'd/m/Y';
            case 'MDY':
                return 'm/d/Y';
            case 'YMD':
                return 'Y/m/d';
            default:
                throw new Error('Invalid date format value.');
        }
    }

    /**
     * Get the Flatpickr compatible date format.
     *
     * @return {String}
     */
    function getTimeFormat() {
        switch (vars('time_format')) {
            case 'regular':
                return 'h:i K';
            case 'military':
                return 'H:i';
            default:
                throw new Error('Invalid date format value.');
        }
    }

    /**
     * Get the localization object.
     *
     * @return Object
     */
    function getFlatpickrLocale() {
        const firstWeekDay = vars('first_weekday');

        const firstWeekDayNumber = App.Utils.Date.getWeekdayId(firstWeekDay);

        return {
            weekdays: {
                shorthand: [
                    lang('sunday_short'),
                    lang('monday_short'),
                    lang('tuesday_short'),
                    lang('wednesday_short'),
                    lang('thursday_short'),
                    lang('friday_short'),
                    lang('saturday_short'),
                ],
                longhand: [
                    lang('sunday'),
                    lang('monday'),
                    lang('tuesday'),
                    lang('wednesday'),
                    lang('thursday'),
                    lang('friday'),
                    lang('saturday'),
                ],
            },
            months: {
                shorthand: [
                    lang('january_short'),
                    lang('february_short'),
                    lang('march_short'),
                    lang('april_short'),
                    lang('may_short'),
                    lang('june_short'),
                    lang('july_short'),
                    lang('august_short'),
                    lang('september_short'),
                    lang('october_short'),
                    lang('november_short'),
                    lang('december_short'),
                ],
                longhand: [
                    lang('january'),
                    lang('february'),
                    lang('march'),
                    lang('april'),
                    lang('may'),
                    lang('june'),
                    lang('july'),
                    lang('august'),
                    lang('september'),
                    lang('october'),
                    lang('november'),
                    lang('december'),
                ],
            },
            daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            firstDayOfWeek: firstWeekDayNumber,
            ordinal: function (nth) {
                const s = nth % 100;

                if (s > 3 && s < 21) return 'th';
                switch (s % 10) {
                    case 1:
                        return 'st';
                    case 2:
                        return 'nd';
                    case 3:
                        return 'rd';
                    default:
                        return 'th';
                }
            },
            rangeSeparator: ` ${lang('to')} `,
            weekAbbreviation: lang('week_short'),
            scrollTitle: lang('scroll_to_increment'),
            toggleTitle: lang('click_to_toggle'),
            amPM: ['am', 'pm'],
            yearAriaLabel: lang('year'),
            monthAriaLabel: lang('month'),
            hourAriaLabel: lang('hour'),
            minuteAriaLabel: lang('minute'),
            time_24hr: false,
        };
    }

    /**
     * Initialize the date time picker component.
     *
     * This method is based on jQuery UI.
     *
     * @param {jQuery} $target
     * @param {Object} [params]
     */
    function initializeDateTimePicker($target, params = {}) {
        const {jalaliMirror, ...flatpickrParams} = params;

        $target.flatpickr({
            enableTime: true,
            allowInput: true,
            static: true,
            dateFormat: `${getDateFormat()} ${getTimeFormat()}`,
            time_24hr: vars('time_format') === 'military',
            locale: getFlatpickrLocale(),
            ...flatpickrParams,
        });

        if (jalaliMirror !== false) {
            attachJalaliMirror($target, true);
        }
    }

    /**
     * Initialize the date picker component.
     *
     * This method is based on jQuery UI.
     *
     * @param {jQuery} $target
     * @param {Object} [params]
     */
    function initializeDatePicker($target, params = {}) {
        const {jalaliMirror, ...flatpickrParams} = params;

        $target.flatpickr({
            allowInput: true,
            dateFormat: getDateFormat(),
            locale: getFlatpickrLocale(),
            static: true,
            ...flatpickrParams,
        });

        if (jalaliMirror !== false) {
            attachJalaliMirror($target, false);
        }
    }

    /**
     * Initialize the time picker component.
     *
     * This method is based on jQuery UI.
     *
     * @param {jQuery} $target
     * @param {Object} [params]
     */
    function initializeTimePicker($target, params = {}) {
        $target.flatpickr({
            noCalendar: true,
            enableTime: true,
            allowInput: true,
            dateFormat: getTimeFormat(),
            time_24hr: vars('time_format') === 'military',
            locale: getFlatpickrLocale(),
            static: true,
            ...params,
        });
    }

    /**
     * Initialize the select dropdown component.
     *
     * This method is based on Select2.
     *
     * @param {jQuery} $target
     * @param {Object} [params]
     */
    function initializeDropdown($target, params = {}) {
        $target.select2(params);
    }

    /**
     * Initialize the text editor component.
     *
     * This method is based on Trumbowyg.
     *
     * @param {jQuery} $target
     * @param {Object} [params]
     */
    function initializeTextEditor($target, params = {}) {
        $target.trumbowyg(params);
    }

    /**
     * Get Date, Date-Time or Time picker value.
     *
     * @param {jQuery} $target
     *
     * @return {Date}
     */
    function getDateTimePickerValue($target) {
        if (!$target?.length) {
            throw new Error('Empty $target argument provided.');
        }

        return $target[0]._flatpickr.selectedDates[0];
    }

    /**
     * Set Date, Date-Time or Time picker value.
     *
     * @param {jQuery} $target
     * @param {Date} value
     */
    function setDateTimePickerValue($target, value) {
        if (!$target?.length) {
            throw new Error('Empty $target argument provided.');
        }

        const result = $target[0]._flatpickr.setDate(value);

        const mirror = $target[0]._jalaliMirror;

        if (mirror && value) {
            mirror.value = formatJalaliInputValue(value, $target[0]._jalaliIncludeTime);
        }

        return result;
    }

    /**
     * Format a Date as the Jalali input value used by the mirror (e.g. "1405/07/12 14:00").
     *
     * @param {Date} date
     * @param {Boolean} withTime
     *
     * @return {String}
     */
    function formatJalaliInputValue(date, withTime) {
        const parts = new Intl.DateTimeFormat('en-u-ca-persian', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).formatToParts(date);

        const get = (type) => parts.find((part) => part.type === type).value;

        const datePart = `${get('year')}/${get('month')}/${get('day')}`;

        if (!withTime) {
            return datePart;
        }

        const momentDate = moment(date);

        return `${datePart} ${momentDate.format('HH:mm')}`;
    }

    /**
     * Attach a Jalali mirror input to a flatpickr-decorated input so that the
     * user interacts with a Jalali calendar; the hidden flatpickr input keeps
     * the Gregorian value that the backend logic relies on.
     *
     * @param {jQuery} $target
     * @param {Boolean} withTime
     */
    function attachJalaliMirror($target, withTime) {
        if (!window.jalaliDatepicker || !$target?.length) {
            return;
        }

        $target.each((index, input) => {
            if (input._jalaliMirror) {
                return;
            }

            const $input = $(input);
            const id = input.id || `dp-${Math.random().toString(36).slice(2, 8)}`;

            if (!input.id) {
                input.id = id;
            }

            // Prevent the native Gregorian flatpickr popup from opening on click.
            if (input._flatpickr) {
                input._flatpickr.set('clickOpens', false);
            }

            const hidden = document.createElement('input');
            hidden.type = 'hidden';
            hidden.id = `${id}-jalali-gregorian`;
            hidden.setAttribute('data-jalali-gregorian-target', '');
            input.parentNode.insertBefore(hidden, input);

            const mirror = input.cloneNode(false);
            mirror.type = 'text';
            mirror.id = `${id}-jalali`;
            mirror.name = `${input.name || id}-jalali`;
            mirror.value = '';
            mirror.removeAttribute('readonly');
            mirror.removeAttribute('data-jdp');

            mirror.setAttribute('data-jalali', '');
            mirror.setAttribute('data-jdp-target-value-input', `#${hidden.id}`);
            mirror.setAttribute('data-jdp-target-value-type', 'gregorian');

            if (!withTime) {
                mirror.setAttribute('data-jdp-only-date', '');
            }

            input.parentNode.insertBefore(mirror, input);
            $input.hide();

            input._jalaliMirror = mirror;
            input._jalaliIncludeTime = withTime;

            // Seed the global jalaliDatepicker options once (high z-index so it
            // appears above modals). The selector is still set so the default
            // focusin-based opening works; per-input target comes from the
            // mirror's own data-jdp-* attributes.
            if (!window._jalaliPickerWatcherStarted) {
                window._jalaliPickerWatcherStarted = true;
                jalaliDatepicker.startWatch({selector: 'input[data-jalali]', zIndex: 2000, date: true, time: true});
            }

            // Open the Jalali calendar panel when this mirror input is focused or clicked.
            const openJalaliPanel = () => jalaliDatepicker.show(mirror);

            mirror.addEventListener('focus', openJalaliPanel);
            mirror.addEventListener('click', openJalaliPanel);

            mirror.addEventListener('change', () => {
                // jalalidatepicker writes the target (gregorian) value AFTER the
                // change event dispatch finishes, so read it on the next tick.
                setTimeout(() => {
                    const gregorian = hidden.value;

                    if (!gregorian || !input._flatpickr) {
                        return;
                    }

                    const parsed = moment(gregorian, ['YYYY-MM-DD HH:mm', 'YYYY-MM-DD'], true);

                    if (parsed.isValid()) {
                        input._flatpickr.setDate(parsed.toDate(), true);
                    }
                }, 10);
            });

            // Mirror the initial flatpickr value, if any.
            const initial = $input.val();

            if (initial && input._flatpickr?.selectedDates?.length) {
                mirror.value = formatJalaliInputValue(input._flatpickr.selectedDates[0], withTime);
            }
        });
    }

    return {
        initializeDateTimePicker,
        initializeDatePicker,
        initializeTimePicker,
        initializeDropdown,
        initializeTextEditor,
        getDateTimePickerValue,
        setDateTimePickerValue,
    };
})();
