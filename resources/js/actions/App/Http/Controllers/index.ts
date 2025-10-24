import Auth from './Auth'
import QrController from './QrController'
import EquipmentController from './EquipmentController'
import MaintenanceController from './MaintenanceController'
import MaintenanceTypeController from './MaintenanceTypeController'
import NotificationController from './NotificationController'
import UserController from './UserController'
import Settings from './Settings'
const Controllers = {
    Auth: Object.assign(Auth, Auth),
QrController: Object.assign(QrController, QrController),
EquipmentController: Object.assign(EquipmentController, EquipmentController),
MaintenanceController: Object.assign(MaintenanceController, MaintenanceController),
MaintenanceTypeController: Object.assign(MaintenanceTypeController, MaintenanceTypeController),
NotificationController: Object.assign(NotificationController, NotificationController),
UserController: Object.assign(UserController, UserController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers