import { Button } from '@/components/ui/button';
import { CalendarDate, getLocalTimeZone } from '@internationalized/date';
import { mount } from '@vue/test-utils';
import { CalendarIcon } from 'lucide-vue-next';
import { describe, expect, it } from 'vitest';
import DateRange from './DateRange.vue';

interface DateRangeEvent {
  start: Date;
  end: Date;
}

describe('DateRange', () => {
  it('deve renderizar corretamente com valores padrão', () => {
    const wrapper = mount(DateRange);

    expect(wrapper.findComponent(Button).exists()).toBe(true);
    expect(wrapper.findComponent(CalendarIcon).exists()).toBe(true);
    expect(wrapper.text()).toContain('Selecione um período');
  });

  it('deve renderizar com datas selecionadas', () => {
    const startDate = new Date(2024, 0, 1);
    const endDate = new Date(2024, 0, 15);

    const wrapper = mount(DateRange, {
      props: {
        startDate,
        endDate,
      },
    });

    expect(wrapper.text()).toContain('1 de jan. de 2024');
    expect(wrapper.text()).toContain('15 de jan. de 2024');
  });

  it('deve emitir evento update:range quando datas são selecionadas', async () => {
    const wrapper = mount(DateRange, {
      global: {
        stubs: {
          RangeCalendar: true,
          Popover: true,
          PopoverTrigger: true,
          PopoverContent: true,
        },
      },
    });

    const startDate = new CalendarDate(2024, 1, 1);
    const endDate = new CalendarDate(2024, 1, 15);

    // Primeiro, verifica se o componente existe
    const calendar = wrapper.findComponent({ name: 'RangeCalendar' });
    expect(calendar.exists()).toBeDefined();

    // Simula a atualização do v-model
    await wrapper.vm.$emit('update:range', {
      start: startDate.toDate(getLocalTimeZone()),
      end: endDate.toDate(getLocalTimeZone()),
    });

    // Verifica se o evento foi emitido
    expect(wrapper.emitted('update:range')).toBeTruthy();

    // Verifica se o evento contém as propriedades corretas
    const emittedEvent = wrapper.emitted('update:range')![0][0] as DateRangeEvent;
    expect(emittedEvent.start).toBeInstanceOf(Date);
    expect(emittedEvent.end).toBeInstanceOf(Date);

    // Verifica as datas específicas
    expect(emittedEvent.start.getFullYear()).toBe(2024);
    expect(emittedEvent.start.getMonth()).toBe(0); // Janeiro é 0
    expect(emittedEvent.start.getDate()).toBe(1);

    expect(emittedEvent.end.getFullYear()).toBe(2024);
    expect(emittedEvent.end.getMonth()).toBe(0);
    expect(emittedEvent.end.getDate()).toBe(15);
  });

  it('deve atualizar as datas quando as props mudam', async () => {
    const wrapper = mount(DateRange);

    const newStartDate = new Date(2024, 0, 1);
    const newEndDate = new Date(2024, 0, 15);

    await wrapper.setProps({
      startDate: newStartDate,
      endDate: newEndDate,
    });

    expect(wrapper.text()).toContain('1 de jan. de 2024');
    expect(wrapper.text()).toContain('15 de jan. de 2024');
  });
});
