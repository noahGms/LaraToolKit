package backend

import "errors"

type Setting struct {
	ID        uint   `json:"id"`
	Key       string `json:"key"`
	Value     string `json:"value"`
	UpdatedAt string `json:"updated_at"`
	CreatedAt string `json:"created_at"`
}

func (b *Backend) GetAllSettings() ([]*Setting, error) {
	var settings []*Setting
	err := b.db.Find(&settings).Error
	if err != nil {
		return nil, err
	}
	return settings, nil
}

func (b *Backend) CreateOrUpdateSetting(key string, value string) (string, error) {
	var setting = Setting{Key: key, Value: value}
	result := b.db.Where(Setting{Key: key}).Assign(setting).FirstOrCreate(&setting)

	if result.Error != nil {
		return "", errors.New("Error creating or updating setting")
	}
	return setting.Value, nil
}
