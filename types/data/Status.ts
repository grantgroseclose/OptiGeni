import { TMaterialColors } from '../config/colors';
import { material_colors } from '../../config/colors';





export type Status = 'Not started' | 'In-progress' | 'Complete';
export type StatusColor = TMaterialColors['red']['accent4'] | TMaterialColors['yellow']['accent3'] | TMaterialColors['green']['accent3'];



export const statusColorMap: Record<Status, StatusColor> = {
    'Not started': material_colors.red.accent4,
    'In-progress': material_colors.yellow.accent3,
    'Complete': material_colors.green.accent3,
};

